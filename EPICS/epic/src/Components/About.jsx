import React, { useState, useEffect, useRef } from "react";
import "./About.css";

const About = () => {
    const [number, setNumber] = useState(0);
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        let start = 0;
                        const target = 1000;
                        const duration = 2000; // Total duration in milliseconds
                        const step = (target / duration) * 10; // Increment per 10ms

                        const interval = setInterval(() => {
                            start += step;
                            if (start >= target) {
                                setNumber(target);
                                clearInterval(interval);
                            } else {
                                setNumber(Math.ceil(start)); // Avoid decimal values
                            }
                        }, 10);

                        observer.unobserve(entry.target); // Stop observing once animation starts
                    }
                });
            },
            { threshold: 0.1 } // Trigger when 10% of the element is visible
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.disconnect();
            }
        };
    }, []);

    return (
        <div className="container">
            <div className="content">
                <h1>About Us</h1>
                <p>
                    At <strong>Saral</strong>, we believe that everyone deserves to be aware of their fundamental rights and the benefits available to them, regardless of their background or circumstances. We are committed to supporting underprivileged communities by spreading knowledge about essential government schemes, legal rights, and resources that can empower individuals and families to improve their quality of life.
                </p>

                <div className="mission">
                    <h2>Our Mission</h2>
                    <p>
                        Our mission is to bridge the gap between underprivileged communities and the knowledge needed to access government assistance, legal protections, and social resources. Through outreach programs, workshops, and accessible content, we aim to empower individuals with the information they need to advocate for themselves and their families.
                    </p>
                </div>
                <p ref={sectionRef} className="schemes-counter">
                    Bringing over <b>{number}</b> schemes at one platform to help you
                </p>
            </div>

            <div className="image-container">
                <img src="./imgs/cropped_image.png" alt="Saral" />
            </div>
        </div>
    );
};

export default About;
