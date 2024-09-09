import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'; // Import BrowserRouter, Routes, and Route
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import CreatePost from './components/CreatePost'; // Import EditPost component
import EditPost from './components/EditPost'; // Import EditPost component
import Homepage from './components/Homepage';
import LoginSignup from './components/LoginSignup';
import Profile from './components/Profile';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/login" element={<LoginSignup login={true} />} />
                <Route path="/signup" element={<LoginSignup login={false} />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/contact-us" element={<ContactUs />} />
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/edit-post/:postId" element={<EditPost />} />
                <Route path="/create-post" element={<CreatePost />} />
            </Routes>
        </Router>
    );
}

export default App;
