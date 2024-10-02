import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './CreatePost.css';
import Navbar from './Navbar';

const CreatePost = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        content: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        const checkToken = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    await axios.get('https://trendelite.onrender.com/api/validate', {
                        headers: {
                            'Authorization': `Bearer ${token}` // Include token in request headers
                        }
                    });
                    setIsLoggedIn(true);
                } catch (err) {
                    if (err.response && err.response.status === 403) {
                        // If the token is invalid or expired, log the user out
                        localStorage.removeItem('token');
                        localStorage.removeItem('userId');
                        setIsLoggedIn(false);
                        navigate('/login');
                    }
                }
            } else {
                setIsLoggedIn(false);
                navigate('/login'); // Redirect to login if not logged in
            }
        };

        checkToken();
    }, [navigate]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async () => {
        const token = localStorage.getItem('token');

        if (!formData.title || !formData.content) {
            alert('Please fill in all fields');
            return;
        }

        try {
            await axios.post('https://trendelite.onrender.com/api/posts', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            alert('Post created successfully');
            navigate('/profile');
        } catch (error) {
            console.error('An error occurred while creating the post:', error);
            if (error.response && error.response.status === 401) {
                // If unauthorized, log the user out and redirect to login
                localStorage.removeItem('token');
                localStorage.removeItem('userId');
                setIsLoggedIn(false);
                navigate('/login');
            } else {
                alert('An error occurred while creating the post');
            }
        }
    };

    return (
        <div className='post-container'>
            <div className='navbarcont'>
                <span className='name'><Link to="/Profile">TrendElite</Link></span>
                <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            </div>
            <div className='form-container'>
                <div className='form-group'>
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        placeholder="Title"
                        value={formData.title}
                        onChange={handleChange}
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor="content">Content:</label>
                    <textarea
                        id="content"
                        name="content"
                        placeholder="Content"
                        value={formData.content}
                        onChange={handleChange}
                    />
                </div>
                <button className='btn' onClick={handleSubmit}>Create Post</button>
            </div>
        </div>
    );
};

export default CreatePost;
