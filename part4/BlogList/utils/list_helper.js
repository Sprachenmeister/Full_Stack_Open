const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlogs = (blogs) => {
    return blogs.reduce(
        (favorite, blog) =>
            !favorite || blog.likes > favorite.likes ? blog : favorite,
        undefined
    )
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlogs,
}