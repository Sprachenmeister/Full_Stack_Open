const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlogs = (blogs) => {
    return blogs.map(blog => )
}

module.exports = {
    dummy,
    totalLikes,
}