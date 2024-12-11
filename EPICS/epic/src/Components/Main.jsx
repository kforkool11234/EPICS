import React from 'react';
import './Main.css';
import { Link } from 'react-router-dom';

const FrontPage = () => {
  return (
    <div className="front-page">
      {/* Background Video */}
      <video className="background-video" autoPlay muted loop>
        <source src="./imgs/farming.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Blurred Box with text */}
      <div className="blurred-box">
        <h1 className="main-text">
          Helping You Learn and Access
          <span className="rights"> Government Support</span>
        </h1>
        <p className="plain-text">For a Better Life, a Secure Life, and a Happy Life</p>
      </div>

      {/* Button positioned below the video */}
      <div className="button-container">
        <Link to="/personalinfo" style={{ textDecoration: 'none' }}>
          <button className="action-button">
            Check applicable schemes for you now
          </button>
        </Link>
      </div>
    </div>
  );
};

export default FrontPage;
