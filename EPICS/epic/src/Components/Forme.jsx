import React from 'react';
import './Forme.css'; 

const Forme = () => {
  return (
    <div className="container">
      <div className="card">
        <div className='card1'>
        <h2>Agent-Based Help</h2>
        <p>
          Our services provide dedicated agents at minimal to no cost to assist with your registration in government schemes. From managing paperwork to guiding you through visits, we ensure a smooth experience.
        </p>
        <p>
          हमारी सेवाएँ न्यूनतम या बिना लागत पर समर्पित एजेंट प्रदान करती हैं, जो सरकारी योजनाओं में पंजीकरण के लिए सहायता करती हैं। कागजी कार्रवाई से लेकर स्थलों पर मार्गदर्शन करने तक, हम आपके अनुभव को सहज बनाते हैं। हमारी टीम पंजीकरण प्रक्रिया को सरल बनाती है, ताकि आप लाभ प्राप्त कर सकें।
        </p>
        <button classname="ludo"><a href="/PersonalInfo.jsx" className="ludo"></a>Register</button>
      </div></div>
      <div className="card">
        <h2>Schemes updates</h2>
        <p>
          Our services provide information about schemes via SMS, along with a list of procedures for better awareness. You can either utilize the scheme for yourself or seek assistance from our agents through the agent portal. Please note that this form is designed solely for sending SMS notifications.
        </p>
        <p>
          हमारी सेवाएँ SMS के माध्यम से योजनाओं की जानकारी प्रदान करती हैं, साथ ही जागरूकता के लिए प्रक्रियाओं की सूची भी उपलब्ध कराती हैं। आप या तो योजना का लाभ स्वयं ले सकते हैं या एजेंट पोर्टल के माध्यम से हमारे एजेंट से सहायता प्राप्त कर सकते हैं।
        </p>
        <button classname="ludo"><a href="/PersonalInfo.jsx" className="ludo"></a>Register</button>
      </div>
      <div className="card">
        <h2>Urgent-Money Need</h2>
        <p>
          We provide local money lending services by offering a list of registered local money lenders who can provide urgent cash when banks can't. You have the flexibility to choose the money lender that suits your needs from the list, ensuring a quick and convenient solution to your financial requirements.
        </p>
        <p>
          हम स्थानीय पैसे उधार देने की सेवाएँ प्रदान करते हैं, जिसमें पंजीकृत स्थानीय पैसे उधार देने वालों की सूची शामिल है, जो बैंक से राशि नहीं मिलने पर तुरंत नकद उपलब्ध करा सकते हैं। आप अपनी आवश्यकताओं के अनुसार किसी भी उधार देने वाले को चुन सकते हैं।
        </p>
        <div className="button-group">
          <button>Register as Borrower</button>
          <button>Register as Lender</button>
        </div>
      </div>
    </div>
  );
};

export default Forme;
