import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
// import TrendEliteVideo from "./video/TrendElite.mp4";

const AboutUs = () => {
            const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <div>
            <div className='navbarcont' >
                    <span className='name'><Link to="/Profile">TrendElite</Link></span>
                    <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
                </div>
            <center><h2>About Us</h2></center>
            <div className="video-container">
                <center>
{/*                     <video height="550" width="80%" controls>
                        Your browser does not support the video tag.
                        <source src={TrendEliteVideo} type="video/mp4" />{" "}
                    </video> */}
                </center>
            </div>
        </div>
    );
}

export default AboutUs;
