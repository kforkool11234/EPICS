import React, { useEffect } from 'react';
import './Contact.css';

const Contact = () => {
  useEffect(() => {
    const formElement = document.querySelector('.contact-form');
    
    // Create an intersection observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            formElement.classList.add('show'); // Add 'show' class when visible
          }
        });
      },
      { threshold: 0.5 } // Trigger when 50% of the form is in the viewport
    );

    observer.observe(formElement); // Start observing the form element

    return () => {
      observer.disconnect(); // Cleanup observer when component unmounts
    };
  }, []);

  return (
    <div className="contact-container">
      <form className="contact-form">
        <label className="contact-label" htmlFor="name">Name:</label>
        <input className="contact-input" type="text" id="name" name="name" />

        <label className="contact-label" htmlFor="email">Email:</label>
        <input className="contact-input" type="email" id="email" name="email" />

        <label className="contact-label" htmlFor="message">Message:</label>
        <textarea className="contact-textarea" id="message" name="message"></textarea>

        <button className="contact-button" type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Contact;
