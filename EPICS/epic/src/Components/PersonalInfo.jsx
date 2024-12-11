import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import axios from "axios";

const PersonalInfo = () => {
  const [language, setLanguage] = useState("english");  // Language state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Gather form data
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      // Send data to the server
      await axios.post("http://localhost:3000/users", data);
      await axios.post("http://localhost:3000/schemes", data);
      // Navigate to the next page after successful submission
      navigate("/");
    } catch (error) {
      console.error("There was an error submitting the form!", error);
    }
  };

  const toggleLanguage = () => {
    setLanguage((prevLanguage) => (prevLanguage === "english" ? "hindi" : "english"));
  };

  return (
    <div>
      <button onClick={toggleLanguage} className="language-toggle">
        {language === "english" ? "Switch to Hindi" : "Switch to English"}
      </button>

      <main>
        <form onSubmit={handleSubmit}>
          <h2>{language === "english" ? "Input Details" : "विवरण दर्ज करें"}</h2>
          
          <label htmlFor="username">{language === "english" ? "Username:" : "उपयोगकर्ता नाम:"}</label>
          <input type="text" id="username" name="username" required />

          <label htmlFor="phone">{language === "english" ? "Mobile number:" : "मोबाइल नंबर:"}</label>
          <input id="phone" name="phone" min="1000000000" required />

          <h2>{language === "english" ? "Social Details" : "सामाजिक विवरण"}</h2>
          
          <label htmlFor="caste">{language === "english" ? "Caste Category:" : "जाति श्रेणी:"}</label>
          <select id="caste" name="caste" required>
            <option value="general">{language === "english" ? "General" : "सामान्य"}</option>
            <option value="sc">{language === "english" ? "SC" : "एससी"}</option>
            <option value="st">{language === "english" ? "ST" : "एसटी"}</option>
            <option value="obc">{language === "english" ? "OBC" : "ओबीसी"}</option>
            <option value="nt-dnt">{language === "english" ? "NT/DNT" : "एनटी/डीएनटी"}</option>
          </select>

          <label htmlFor="gender">{language === "english" ? "Gender:" : "लिंग:"}</label>
          <select id="gender" name="gender" required>
            <option value="male">{language === "english" ? "Male" : "पुरुष"}</option>
            <option value="female">{language === "english" ? "Female" : "महिला"}</option>
            <option value="others">{language === "english" ? "Others" : "अन्य"}</option>
          </select>

          <label htmlFor="age">{language === "english" ? "Age (in years):" : "आयु (वर्षों में):"}</label>
          <input type="number" id="age" name="age" min="0" required />

          <p>{language === "english" ? "Reserved Categories:" : "आरक्षित श्रेणियाँ:"}</p>
          <div className="special-categories">
            <div>
              <input type="checkbox" id="pregnant" name="categories" value="pregnant" />
              <label htmlFor="pregnant">{language === "english" ? "Pregnant/Lactating Mothers" : "गर्भवती/स्तनपान कराने वाली माताएँ"}</label>
            </div>
            <div>
              <input type="checkbox" id="entrepreneurs" name="categories" value="entrepreneurs" />
              <label htmlFor="entrepreneurs">{language === "english" ? "Entrepreneurs" : "उद्यमी"}</label>
            </div>
            <div>
              <input type="checkbox" id="disabled" name="categories" value="disabled" />
              <label htmlFor="disabled">{language === "english" ? "Handicapped/blind/deaf/mute" : "विकलांग/अंधा/बहरा/मूक"}</label>
            </div>
          </div>

          <label htmlFor="location">{language === "english" ? "Location:" : "स्थान:"}</label>
          <select id="location" name="location" required>
            <option value="urban">{language === "english" ? "Urban Slum" : "शहरी स्लम"}</option>
            <option value="rural">{language === "english" ? "Rural Village" : "ग्रामीण गांव"}</option>
          </select>

          {/* New fields for City, Pincode, and State */}
          <label htmlFor="city">{language === "english" ? "City:" : "शहर:"}</label>
          <input type="text" id="city" name="city" required />

          <label htmlFor="pincode">{language === "english" ? "Pincode:" : "पिनकोड:"}</label>
          <input type="text" id="pincode" name="pincode" required />

          <label htmlFor="state">{language === "english" ? "State:" : "राज्य:"}</label>
          <input type="text" id="state" name="state" required />

          <h2>{language === "english" ? "Economic Details" : "आर्थिक विवरण"}</h2>

          <label htmlFor="income">{language === "english" ? "Annual Family Income:" : "वार्षिक पारिवारिक आय:"}</label>
          <select id="income" name="income" required>
            <option value="<1lakh">{language === "english" ? "Less than ₹1,00,000" : "₹1,00,000 से कम"}</option>
            <option value="1-2.5lakh">{language === "english" ? "Between ₹1,00,000 - ₹2,50,000" : "₹1,00,000 - ₹2,50,000 के बीच"}</option>
            <option value="2.5-8lakh">{language === "english" ? "Between ₹2,50,000 - ₹8,00,000" : "₹2,50,000 - ₹8,00,000 के बीच"}</option>
            <option value=">8lakh">{language === "english" ? "More than ₹8,00,000" : "₹8,00,000 से अधिक"}</option>
          </select>

          <label htmlFor="religion">{language === "english" ? "Religious Affiliation:" : "धार्मिक संबंध:"}</label>
          <select id="religion" name="religion" required>
            {["hindu", "muslim", "christian", "sikh", "buddhist", "jain", "parsi"].map((religion) => (
              <option key={religion} value={religion}>
                {language === "english" ? religion.charAt(0).toUpperCase() + religion.slice(1) : religion === "hindu" ? "हिंदू" : religion === "muslim" ? "मुस्लिम" : religion === "christian" ? "ईसाई" : religion === "sikh" ? "सिख" : religion === "buddhist" ? "बौद्ध" : religion === "jain" ? "जैन" : religion === "parsi" ? "पारसी" : religion}
              </option>
            ))}
          </select>

          <h2>{language === "english" ? "Education" : "शिक्षा"}</h2>
          <label htmlFor="education">{language === "english" ? "Education" : "शिक्षा"}</label>
          <select id="education" name="education" required>
            <option value="read and write">{language === "english" ? "Knows to read and write" : "पढ़ और लिख सकता है"}</option>
            <option value="upto class 10">{language === "english" ? "Class 10" : "कक्षा 10"}</option>
            <option value="upto class 12">{language === "english" ? "Class 12" : "कक्षा 12"}</option>
            <option value="college">{language === "english" ? "Higher education" : "उच्च शिक्षा"}</option>
          </select>

          <h2>{language === "english" ? "Select Your Domain" : "अपना डोमेन चुनें"}</h2>
          <p>{language === "english" ? "Preferred Schemes:" : "पसंदीदा योजनाएँ:"}</p>
          <div className="preferred-scheme">
            <div>
              <input type="checkbox" id="medical" name="domain" value="medical" />
              <label htmlFor="medical">{language === "english" ? "Medical/Healthcare" : "चिकित्सा/स्वास्थ्य देखभाल"}</label>
            </div>
            <div>
              <input type="checkbox" id="agriculture" name="domain" value="agriculture" />
              <label htmlFor="agriculture">{language === "english" ? "Agriculture" : "कृषि"}</label>
            </div>
            <div>
              <input type="checkbox" id="loans" name="domain" value="loans" />
              <label htmlFor="loans">{language === "english" ? "Loans/Financial Aid" : "लोन/वित्तीय सहायता"}</label>
            </div>
            <div>
              <input type="checkbox" id="housing" name="domain" value="housing" />
              <label htmlFor="housing">{language === "english" ? "Housing" : "आवास"}</label>
            </div>
            <div>
              <input type="checkbox" id="employment" name="domain" value="employment" />
              <label htmlFor="employment">{language === "english" ? "Employment" : "रोजगार"}</label>
            </div>
            <div>
              <input type="checkbox" id="women" name="domain" value="women" />
              <label htmlFor="women">{language === "english" ? "Women Empowerment" : "महिला सशक्तिकरण"}</label>
            </div>
            <div>
              <input type="checkbox" id="skilldevelopment" name="domain" value="skilldevelopment" />
              <label htmlFor="skilldevelopment">{language === "english" ? "Skill Development" : "कौशल विकास"}</label>
            </div>
            <div>
              <input type="checkbox" id="entrepreneurship" name="domain" value="entrepreneurship" />
              <label htmlFor="entrepreneurship">{language === "english" ? "Entrepreneurship" : "उद्यमिता"}</label>
            </div>
            <div>
              <input type="checkbox" id="Environmental Support" name="domain" value="Environmental Support" />
              <label htmlFor="Environmental Support">{language === "english" ? "Environmental Support" : "पर्यावरण समर्थन"}</label>
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit">{language === "english" ? "Next" : "अगला"}</button>
        </form>
      </main>
    </div>
  );
};

export default PersonalInfo;
