const express = require('express');
const router = express.Router();

const ContactMessage = require('../models/ContactMessage');

// Contact form submission
router.post('/', (req, res) => {
    const { name, email, query } = req.body;

    const newMessage = new ContactMessage({
        name,
        email,
        query
    });

    newMessage.save()
        .then(message => res.json(message))
        .catch(err => console.log(err));
});

module.exports = router;
