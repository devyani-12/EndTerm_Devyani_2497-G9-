import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './CreatePost.css';
import './EditPost.css';

const EditPost = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const { postId } = useParams();
    const navigate = useNavigate();

    const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login'); // Redirect to login page if not logged in
            return; // Exit early if not logged in
        }

       

    useEffect(() => {
        axios.get(`http://localhost:5000/api/posts/${postId}` , {
            headers: {
                'Authorization': `Bearer ${token}` // Include token in request headers
            }
        })
            .then(res => {
                setTitle(res.data.title);
                setContent(res.data.content);
            })
            .catch(err => console.log(err));
    }, [postId]);

    const handleSubmit = () => {
        axios.put(`http://localhost:5000/api/posts/${postId}`, { title, content } , {
            headers: {
                'Authorization': `Bearer ${token}` // Include token in request headers
            }
        })
            .then(res => {
                console.log(res.data);
                navigate('/profile');
            })
            .catch(err => console.log(err));
    };

    return (
        <div className='dfl editcontainer'>
            <div className='dfl fdc editbox aic'>
                <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
                <textarea value={content} onChange={e => setContent(e.target.value)}></textarea>
                <button onClick={handleSubmit}>Update Post</button>
            </div>
        </div>
    );
}

export default EditPost;