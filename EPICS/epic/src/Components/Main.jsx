import React from 'react';
import './Main.css';

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

   
    </div>
  );
};

export default FrontPage;
