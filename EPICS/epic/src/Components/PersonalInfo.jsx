import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import axios from "axios";

const PersonalInfo = () => {
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
      // Optionally, you could show an error message to the user here
    }
  };

  return (
    <div>
      <main>
        <form onSubmit={handleSubmit}>
          <h2>Input Details</h2>
          <label htmlFor="Username">Username:</label>
          <input type="text" id="username" name="username" required />

          <label htmlFor="phone">Mobile number:</label>
          <input  id="phone" name="phone" min="1000000000" required />

          <h2>Social Details</h2>
          <label htmlFor="caste">Caste Category:</label>
          <select id="caste" name="caste" required>
            <option value="general">General</option>
            <option value="sc">SC</option>
            <option value="st">ST</option>
            <option value="obc">OBC</option>
            <option value="nt-dnt">NT/DNT</option>
          </select>

          <label htmlFor="gender">Gender:</label>
          <select id="gender" name="gender" required>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="others">Others</option>
          </select>

          <label htmlFor="age">Age (in years):</label>
          <input type="number" id="age" name="age" min="0" required />

          

          <p>Reserved Categories:</p>
          <div className="special-categories">
            <div>
              <input type="checkbox" id="pregnant" name="categories" value="pregnant" />
              <label htmlFor="pregnant">Pregnant/Lactating Mothers</label>
            </div>
            <div>
              <input type="checkbox" id="entrepreneurs" name="categories" value="entrepreneurs" />
              <label htmlFor="entrepreneurs">Entrepreneurs</label>
            </div>
            <div>
              <input type="checkbox" id="disabled" name="categories" value="Disabled" />
              <label htmlFor="Disabled">Handicapped/blind/deaf/mute</label>
            </div>
          </div>

          <label htmlFor="location">Location:</label>
          <select id="location" name="location" required>
            <option value="urban">Urban Slum</option>
            <option value="rural">Rural Village</option>
          </select>

          <h2>Economic Details</h2>
          <label htmlFor="income">Annual Family Income:</label>
          <select id="income" name="income" required>
            <option value="<1lakh">Less than ₹1,00,000</option>
            <option value="1-2.5lakh">Between ₹1,00,000 - ₹2,50,000</option>
            <option value="2.5-8lakh">Between ₹2,50,000 - ₹8,00,000</option>
            <option value="">More than ₹8,00,000</option>
          </select>

          <label htmlFor="religion">Religious Affiliation:</label>
          <select id="religion" name="religion" required>
            {/* Add more options as needed */}
            {["hindu", "muslim", "christian", "sikh", "buddhist", "jain", "parsi"].map((religion) => (
              <option key={religion} value={religion}>{religion.charAt(0).toUpperCase() + religion.slice(1)}</option> 
            ))}
          </select>
          <h2>Education</h2>
          <label htmlFor="education">Education</label>
          <select id="education" name="education" required>
            <option value="read and write">knows to read and write</option>
            <option value="upto class 10">Class 10</option>
            <option value="upto class 12">class 12</option>
            <option value="college">Higher education</option>
          </select>
          <h2>Select Your Domain</h2>
      <p>Preferred Schemes:</p>
      <div className="preferred-scheme">
        <div>
        <input type="checkbox" id="medical" name="domain" value="medical" />
        <label htmlFor="medical">Medical/Healthcare</label>
        </div>
        <div>
        <input type="checkbox" id="agriculture" name="domain" value="agriculture" />
        <label htmlFor="agriculture">Agriculture</label>
        </div>
        <div>
        <input type="checkbox" id="loans" name="domain" value="loans" />
        <label htmlFor="loans">Loans/Financial Aid</label>
        </div>
        <div>
        <input type="checkbox" id="housing" name="domain" value="housing" />
        <label htmlFor="housing">Housing</label>
        </div>
        <div>
        <input type="checkbox" id="employment" name="domain" value="employment" />
        <label htmlFor="employment">Employment</label>
        </div>
        <div>
        <input type="checkbox" id="women" name="domain" value="women" />
        <label htmlFor="women">Women Empowerment</label>
        </div>
        <div>
        <input type="checkbox" id="skilldevelopment" name="domain" value="skilldevelopment" />
        <label htmlFor="skilldevelopment">Skill Development </label>
        </div>
        <div>
        <input type="checkbox" id="entrepreneurship" name="domain" value="entrepreneurship" />
        <label htmlFor="entrepreneurship">Entrepreneurship</label>
        </div>
        <div>
        <input type="checkbox" id="Environmental Support" name="domain" value="Environmental Support" />
        <label htmlFor="Environmental Support">Environmental Support</label>
        </div>
     </div>

          {/* Health Status Section */}
          {/* ... (rest of your form fields) ... */}

          {/* Submit Button */}
          <button type="submit">Next</button>
        </form>
      </main>
    </div>
  );
};

export default PersonalInfo;