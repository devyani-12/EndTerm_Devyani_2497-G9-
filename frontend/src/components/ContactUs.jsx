import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ContactUs.css';
import Navbar from './Navbar';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        query: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = () => {
        setIsSubmitting(true);
        axios.post('http://localhost:5000/api/contact', formData)
            .then(res => {
                setIsSubmitting(false);
                setIsSuccess(true);
                setTimeout(() => {
                    setIsSuccess(false);
                    setFormData({
                        name: '',
                        email: '',
                        query: ''
                    });
                }, 3000);
            })
            .catch(err => {
                setIsSubmitting(false);
                setIsError(true);
            });
    };

    return (
        <div className='contact-container'>
            <div className='navbarcont'>
                <span className='name'><Link to="/Profile">TrendElite</Link></span>
                <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            </div>
            <div className='contact-box'>
                <div className='input-group'>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
                </div>
                <div className='input-group'>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
                </div>
                <div className='input-group'>
                    <label htmlFor="query">Query:</label>
                    <textarea id="query" name="query" value={formData.query} onChange={handleChange}></textarea>
                </div>
                
                {isSubmitting && <p className="submit-status">Sending...</p>}
                {isSuccess && <p className="submit-status success">Query submitted successfully!</p>}
                {isError && <p className="submit-status error">Oops! Something went wrong. Please try again later.</p>}

<button onClick={handleSubmit} disabled={isSubmitting}>Submit</button>
            </div>
        </div>
    );
}

export default ContactUs;
