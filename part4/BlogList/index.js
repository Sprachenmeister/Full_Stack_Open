require('dotenv').config()
const express = require('express')
const Blog = require('./models/blog')
const {request} = require("express");

const app = express()

let blogs = []


app.use(express.json())


const requestLogger = ( request, response, next ) => {
    console.log('Method:', request.method)
    console.log('Path: ', request.path)
    console.log('Body: ', request.body)
    console.log('---')
    next()
}

app.use(requestLogger)

app.use(express.static('dist'))
app.get('/api/blogs', (request, response) => {
    Blog.find({}).then(blogs => {
        response.json(blogs)
    })
})

app.get('/api/blogs/:id', (request, response) => {
    Blog.findById(request.params.id)
        .then(blog => {
            if (blog) {
                response.json(blog)
            } else {
                response.status(404).end()
            }
        }).catch(error => next(error))
})


app.post('/api/blogs', (request, response) => {
    const body = request.body

    if (!body.content) {
        return response.status(404).json({
            error: 'content missing'
        })
    }

    const blog = new Blog({
        title: body.content,
        author: body.author,
        url: body.url,
        content: body.content,
        likes: body.likes,
    })

    blog.save().then(savedBlog => {
        response.json(savedBlog)
    })
})

app.delete('/api/blogs/:id', (request, response) => {
    Blog.findByIdAndDelete (request.params.id)
        .then(result => {
            response.status(204).end()
    }).catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint ' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.log(error)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformed id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).send({error: error.message})
    }

    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () =>
    console.log(`Server running on port ${PORT}`))