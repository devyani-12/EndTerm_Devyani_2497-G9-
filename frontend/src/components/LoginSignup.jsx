import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginSignup.css';

const LoginSignup = ({login}) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [isLogin, setIsLogin] = useState(login); // State to track if it's login or signup
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = () => {
        // Basic form validation
        if (!formData.email || !formData.password) {
            setError('Please fill in all fields');
            return;
        }

        if (isLogin) {
            // Login logic
            axios.post('https://trendelite.onrender.com/api/auth/login', formData)
                .then(res => {
                    localStorage.setItem('token', res.data.token);
                    localStorage.setItem('userId', res.data.userId);
                    navigate('/');
                })
                .catch(err => {
                    setError('Invalid credentials');
                    console.log(err);
                });
        } else {
            // Signup logic
            axios.post('https://trendelite.onrender.com/api/auth/register', formData)
                .then(res => {
                    // localStorage.setItem('token', res.data.token);
                    // localStorage.setItem('userId', res.data.userId);                                                                                                             
                    navigate('/login');
                    window.location.reload();
                })
                .catch(err => {
                    setError('User already exists');
                    console.log(err);
                });
        }
    };  

    const toggleForm = () => {
        setIsLogin(!isLogin); // Toggle between login and signup
        setError(''); // Clear any previous error messages
    };

    return (
        <div className='dfl jcc aic fdc'>
            <h2>{isLogin ? 'Login' : 'Signup'}</h2>
            <div className='form'>
                <input type="text" name="email" placeholder="Email" onChange={handleChange} />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} />
                <button onClick={handleSubmit}>{isLogin ? 'Login' : 'Signup'}</button>
                {error && <p className="error">{error}</p>}
            </div>
            <p className='toggleText' onClick={toggleForm}>{isLogin ? 'Don\'t have an account? Sign up' : 'Already have an account? Log in'}</p>
        </div>
    );
}

export default LoginSignup;
 