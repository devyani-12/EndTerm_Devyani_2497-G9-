import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const Profile = () => {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

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

        axios.get('https://trendelite.onrender.com/api/posts', {
            headers: {
                Authorization: `Bearer ${token}`, // Include token in request headers
            },
        })
        .then(res => {
            const filteredPosts = res.data.filter(post => post.author === userId);
            setPosts(filteredPosts);
            setLoading(false);
        })
        .catch(err => {
            setError('Failed to fetch posts. Please try again later.');
            setLoading(false);
            if (err.response && err.response.status === 401) {
                // If the token is invalid or expired, log the user out
                localStorage.removeItem('token');
                localStorage.removeItem('userId');
                setIsLoggedIn(false);
                navigate('/login');
            }
        });
    }, [navigate, token, userId]);

    const handleEdit = (postId) => {
        navigate(`/edit-post/${postId}`);
    };

    const handleDelete = (postId) => {
        axios.delete(`https://trendelite.onrender.com/api/posts/${postId}`, {
            headers: {
                Authorization: `Bearer ${token}`, // Include token in request headers
            },
        })
        .then(() => {
            setPosts(posts.filter(post => post._id !== postId));
        })
        .catch(() => {
            setError('Failed to delete the post. Please try again later.');
        });
    };

    return (
        <div>
            <div className='navbarcont'>
                <span className='name'><Link to="/Profile">TrendElite</Link></span>
                <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            </div>
            <div className='posts'>
                {loading && <p>Loading...</p>}
                {error && <p className="error">{error}</p>}
                {!loading && posts.length === 0 && <p>No Posts to Display</p>}
                {posts.map(post => (
                    <div className='post' key={post._id}>
                        <h2>{post.title}</h2>
                        <p>{post.content}</p>
                        <div>
                            <button onClick={() => handleEdit(post._id)}>Edit</button>
                            <button onClick={() => handleDelete(post._id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Profile;