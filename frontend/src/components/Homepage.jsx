import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Homepage.css';
import Navbar from './Navbar';

const Homepage = () => {
    const [posts, setPosts] = useState([]); // Initialize posts as an empty array
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // If token exists, set isLoggedIn to true
            setIsLoggedIn(true);

            // Fetch posts only if token exists
            axios.get('http://localhost:5000/api/posts', {
                headers: {
                    'Authorization': `Bearer ${token}` // Include token in request headers
                }
            })
            .then(res => {
                // Ensure that res.data is an array before updating posts
                if (Array.isArray(res.data)) {
                    setPosts(res.data);
                } else {
                    console.error('Invalid data format received:', res.data);
                }
            })
            .catch(err => {
                console.error('Error fetching posts:', err);
                if (err.response && err.response.status === 403) {
                    // If the token is invalid or expired, log the user out
                    localStorage.removeItem('token');
                    localStorage.removeItem('userId');
                    setIsLoggedIn(false);
                    navigate('/login');
                }
            });
        } else {
            setIsLoggedIn(false);
        }
    }, [navigate]);

    return (
        <div>
            <div className='navbarcont'>
                <span className='name'><Link to="/Profile">TrendElite</Link></span>
                <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            </div>

            {isLoggedIn ? (
                <div className='posts'>
                    {posts.map(post => (
                        <div className='post' key={post._id}>
                            <h2>{post.title}</h2>
                            <p>{post.content}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <div className='dfl jcc tac f20'>
                    Please log in or sign up! 
                    <Link to="/signup">
                        <img src="https://www.transparentpng.com/thumb/register-button/0PVOvb-register-button-free-png.png" alt="Sign Up"/>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Homepage;