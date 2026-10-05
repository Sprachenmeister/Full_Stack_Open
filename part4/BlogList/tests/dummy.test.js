const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    assert.strictEqual(result, 1)
})

describe('total likes', () => {
    const listWithOneBlog = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
            likes: 7,
            __v: 0
        }
    ]

    test('when list has only one blog, equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        assert.strictEqual(result, 7)
        console.log(result)
    })

})

describe('returns the blog with the most likes', () => {
    const blogs = [
        { title: 'First blog', likes: 1},
        { title: 'Second blog', likes: 19},
        { title: 'Third blog', likes: 10},
    ]

    const result = listHelper.favoriteBlogs(blogs)
    assert.deepStrictEqual(result, result)
    console.log(result)
})

