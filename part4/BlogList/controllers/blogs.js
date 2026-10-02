const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
    Blog.find({}).then(blogs => {
        response.json(blogs)
    })
})

blogsRouter.get('/:id', (request, response, next) => {
    Blog.findById(request.params.id)
        .then( blog => {
            if (blog) {
                response.json(blog)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})

blogsRouter.post('/', (request, response, next) => {
    const body = request.body

    const blog = new Blog({
        title: body.content,
        author: body.author,
        url: body.url,
        content: body.content,
        likes: body.likes,
    })

    blog.save()
        .then(savedBlog => {
            response.json(savedBlog)
        })
        .catch(error => next(error))
})

blogsRouter.delete('/:id', (request, response, next) => {
    Blog.findByIdAndDelete(request.params.id)
        .then(() => {
            response.status(204).end()
    })
        .catch(error => next(error))
})

blogsRouter.delete('/:id', (request, response, next) => {
    const { title, author, url, content ,likes } = request.body

    Blog.findById(request.params.id)
        .then(blog => {
            if (!blog) {
                return response.status(404).end()
            }

            blog.title = title
            blog.author = author
            blog.url = url
            blog.content = content
            blog.likes = likes

            return blog.save().then((updatedBlog) => {
                response.json(updatedBlog)
            })
        }).catch(error => next(error))
})

module.exports = blogsRouter