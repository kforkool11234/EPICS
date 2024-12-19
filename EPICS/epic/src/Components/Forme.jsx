import React, { useState, useEffect, useRef } from 'react';
import './Forme.css'; 
import { Link } from 'react-router-dom';

const Forme = () => {
  const [isVisible, setIsVisible] = useState([false, false, false]);
  const cardsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => {
              const updated = [...prev];
              updated[index] = true;
              return updated;
            });
          }
        });
      },
      { threshold: 0.1 } // Trigger when 10% of the card is visible
    );

    cardsRef.current.forEach((card, index) => {
      if (card) {
        observer.observe(card);
      }
    });

    return () => {
      if (cardsRef.current) {
        cardsRef.current.forEach((card) => observer.unobserve(card));
      }
    };
  }, []);

  return (
    <div className="container">
      {/* Card 1: Agent-Based Help */}
      <div
        className={`card ${isVisible[0] ? 'visible' : ''}`}
        ref={(el) => (cardsRef.current[0] = el)}
      >
        <div className="card1">
          <h2>Agent-Based Help</h2>
          <p>
            Our services provide dedicated agents at minimal to no cost to assist with your registration in government schemes. From managing paperwork to guiding you through visits, we ensure a smooth experience.
          </p>
          <p>
            हमारी सेवाएँ न्यूनतम या बिना लागत पर समर्पित एजेंट प्रदान करती हैं, जो सरकारी योजनाओं में पंजीकरण के लिए सहायता करती हैं। कागजी कार्रवाई से लेकर स्थलों पर मार्गदर्शन करने तक, हम आपके अनुभव को सहज बनाते हैं। हमारी टीम पंजीकरण प्रक्रिया को सरल बनाती है, ताकि आप लाभ प्राप्त कर सकें।
          </p>
          <Link to="/personalinfo"  style={{ textDecoration: 'none', color: 'white'}}>
            <button>Register</button>
          </Link>
        </div>
      </div>

      {/* Card 2: Schemes Updates */}
      <div
        className={`card ${isVisible[1] ? 'visible' : ''}`}
        ref={(el) => (cardsRef.current[1] = el)}
      >
        <h2>Schemes Updates</h2>
        <p>
          Our services provide information about schemes via SMS, along with a list of procedures for better awareness. You can either utilize the scheme for yourself or seek assistance from our agents through the agent portal. Please note that this form is designed solely for sending SMS notifications.
        </p>
        <p>
          हमारी सेवाएँ SMS के माध्यम से योजनाओं की जानकारी प्रदान करती हैं, साथ ही जागरूकता के लिए प्रक्रियाओं की सूची भी उपलब्ध कराती हैं। आप या तो योजना का लाभ स्वयं ले सकते हैं या एजेंट पोर्टल के माध्यम से हमारे एजेंट से सहायता प्राप्त कर सकते हैं।
        </p>
        <Link to="/personalinfo" className="button-link" style={{ textDecoration: 'none', color: 'white'}}>
          <button>Register</button>
        </Link>
      </div>

      {/* Card 3: Urgent Money Need */}
      <div
        className={`card ${isVisible[2] ? 'visible' : ''}`}
        ref={(el) => (cardsRef.current[2] = el)}
      >
        <h2>Urgent-Money Need</h2>
        <p>
          We provide local money lending services by offering a list of registered local money lenders who can provide urgent cash when banks can't. You have the flexibility to choose the money lender that suits your needs from the list, ensuring a quick and convenient solution to your financial requirements.
        </p>
        <p>
          हम स्थानीय पैसे उधार देने की सेवाएँ प्रदान करते हैं, जिसमें पंजीकृत स्थानीय पैसे उधार देने वालों की सूची शामिल है, जो बैंक से राशि नहीं मिलने पर तुरंत नकद उपलब्ध करा सकते हैं। आप अपनी आवश्यकताओं के अनुसार किसी भी उधार देने वाले को चुन सकते हैं।
        </p>
        <div className="button-group">
          <Link to="/personalinfo" className="button-link" style={{ textDecoration: 'none', color: 'white'}}>
            <button>
              Register as Borrower
            </button>
          </Link>
          <Link to="/moneylender" className="button-link" style={{ textDecoration: 'none', color: 'white'}}>
            <button>
              Register as Lender
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Forme;
