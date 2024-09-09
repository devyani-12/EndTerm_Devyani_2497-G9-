const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const authenticateUser = require('./authMiddleware');

// Login

router.post('/login', (req, res) => {
    const { email, password } = req.body;

    User.findOne({ email })
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (!isMatch) {
                        return res.status(400).json({ message: 'Invalid credentials' });
                    }

                    const token = jwt.sign({ id: user._id }, 'secret', { expiresIn: '1h' });
                    res.json({ token, userId: user._id });
                    
                });
        });
});

// Register
router.post('/register', (req, res) => {
    const { email, password } = req.body;

    User.findOne({ email })
        .then(user => {
            if (user) {
                return res.status(400).json({ message: 'User already exists' });
            }

            const newUser = new User({
                email,
                password
            });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(user => {
                            const token = jwt.sign({ id: user._id }, 'secret', { expiresIn: '1h' });
                            res.json({ token });
                        })
                        .catch(err => console.log(err));
                });
            });
        });
});

module.exports = router;
