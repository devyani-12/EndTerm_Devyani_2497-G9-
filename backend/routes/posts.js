const express = require('express');
const router = express.Router();

const Post = require('../models/Post');

// Get all posts
router.get('/', (req, res) => {
    Post.find({})
        .then(posts => res.json(posts))
        .catch(err => console.log(err));
});

// Get single post
router.get('/:id', (req, res) => {
    Post.findById(req.params.id)
        .then(post => res.json(post))
        .catch(err => console.log(err));
});

// Create post
router.post('/', (req, res) => {
    const { title, content } = req.body;

    const newPost = new Post({
        title,
        content,
        author: req.user.id // Assuming user is authenticated and user id is available in req.user.id
    });

    newPost.save()
        .then(post => res.json(post))
        .catch(err => console.log(err));
});

// Update post
router.put('/:id', (req, res) => {
    const { title, content } = req.body;

    Post.findByIdAndUpdate(req.params.id, { title, content })
        .then(post => res.json(post))
        .catch(err => console.log(err));
});

// Delete post
router.delete('/:id', (req, res) => {
    Post.findByIdAndDelete(req.params.id)
        .then(() => res.json({ message: 'Post deleted' }))
        .catch(err => console.log(err));
});

module.exports = router;
