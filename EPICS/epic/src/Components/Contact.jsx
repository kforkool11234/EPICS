import React, { useEffect, useState } from 'react';
import './Contact.css';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push } from 'firebase/database';

// Firebase configuration
const firebaseConfig = {
  databaseURL: "https://epics-5e8a4-default-rtdb.firebaseio.com/",
  projectId: "epics-5e8a4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [responseMessage, setResponseMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

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

    observer.observe(formElement);

    return () => observer.disconnect(); // Cleanup observer on unmount
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const submitData = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;
    setIsSubmitting(true);

    const { name, email, message } = formData;

    try {
      const timestamp = new Date().toISOString();
      const dbRef = ref(database, 'messages');

      await push(dbRef, {
        name,
        email,
        message,
        timestamp,
      });

      const responseMessage = "Message sent successfully!";
      alert(responseMessage);  // Show response message in alert
      setFormData({
        name: '',
        email: '',
        message: '',
      });
    } catch (error) {
      const errorMessage = `An error occurred: ${error.message}`;
      alert(errorMessage);  // Show error message in alert
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-container">
      <form className="contact-form" onSubmit={submitData}>
        <label className="contact-label" htmlFor="name">Name:</label>
        <input
          className="contact-input"
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label className="contact-label" htmlFor="email">Email:</label>
        <input
          className="contact-input"
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label className="contact-label" htmlFor="message">Message:</label>
        <textarea
          className="contact-textarea"
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
        />

        <button
          className="contact-button"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Sending...' : 'Submit'}
        </button>
      </form>

      {responseMessage && <p className="response-message">{responseMessage}</p>}
    </div>
  );
};

export default Contact;
