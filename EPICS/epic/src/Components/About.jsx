import React from "react";
import "./About.css";

const About = () => {
    return (
        <div className="container">
            <div className="content">
                <h1>About Us</h1>
                <p>
                    At <strong>Seva-setu</strong>, we believe that everyone deserves to be aware of their fundamental rights and the benefits available to them, regardless of their background or circumstances. We are committed to supporting underprivileged communities by spreading knowledge about essential government schemes, legal rights, and resources that can empower individuals and families to improve their quality of life.
                </p>

                <div className="mission">
                    <h2>Our Mission</h2>
                    <p>
                        Our mission is to bridge the gap between underprivileged communities and the knowledge needed to access government assistance, legal protections, and social resources. Through outreach programs, workshops, and accessible content, we aim to empower individuals with the information they need to advocate for themselves and their families.
                    </p>
                </div>
                </div>
               
            

            <div className="image-container">
                <img src="./imgs/cropped_image.png"/>
            </div>
           

        </div>
    );
};

export default About;
