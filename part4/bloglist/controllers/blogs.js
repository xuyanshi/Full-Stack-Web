const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const {json} = require("express");

// get all blogs
blogsRouter.get('/', (req, res) => {
    Blog.find({}).then(b => {
        res.json(b)
    })
})

// get one blog
blogsRouter.get('/:id', (req, res, next) => {
    Blog.findById(req.params.id)
        .then(b => {
            if (b) {
                res.json(b)
            } else {
                res.status(404).end()
            }
        })
})

// create a new blog

blogsRouter.post('/', (req, res, next) => {

    const body = req.body
    if (body.likes === undefined) {
        body.likes = 0
    }
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
    })
    // const savedBlog = blog.save()
    // res.status(201).json(savedBlog)

    blog.save()
        .then(savedBlog => {
            res.status(201).json(savedBlog)
        })
        .catch(err => next(err))
})

// delete one blog
blogsRouter.delete('/:id', (req, res, next) => {
    Blog.findByIdAndRemove(req.params.id)
        .then(() => {
            res.status(204).end()
        })
        .catch(err => next(err))
})

// update one blog
blogsRouter.put('/:id', (req, res, next) => {
    const body = req.body

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
    }

    Blog.findByIdAndUpdate(req.params.id, blog, {new: true})
        .then(updatedBlog => {
            //res.status(200).json(updatedBlog)
            res.json(updatedBlog)
        })
        .catch(err => next(err))
})

module.exports = blogsRouter
