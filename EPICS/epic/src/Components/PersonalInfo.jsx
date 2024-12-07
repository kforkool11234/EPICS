import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const PersonalInfo = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/domain-selection");
  };

  return (
    <div className="container">
      <main>
        <form onSubmit={handleSubmit}>
          <h2>Input Details</h2>
          <label htmlFor="name">Full Name:</label>
          <input type="text" id="name" name="name" required />

          <label htmlFor="dob">Date of Birth:</label>
          <input type="date" id="dob" name="dob" required />

          <label htmlFor="age">Age (in years):</label>
          <input type="number" id="age" name="age" min="0" required />

          <label htmlFor="gender">Gender:</label>
          <select id="gender" name="gender" required>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="transgender">Transgender</option>
            <option value="others">Others</option>
          </select>

          <p>Specific Categories:</p>
          <div className="special-categories">
            <div>
            <input type="checkbox" id="pregnant" name="categories" value="pregnant" />
            <label htmlFor="pregnant">Pregnant/Lactating Mothers</label>
            </div>
            <div>
            <input type="checkbox" id="adolescent" name="categories" value="adolescent" />
            <label htmlFor="adolescent">Adolescent Girls</label>
            </div>
            <div>
            <input type="checkbox" id="women-entrepreneurs" name="categories" value="women-entrepreneurs" />
            <label htmlFor="women-entrepreneurs">Women Entrepreneurs</label>
            </div>
          </div>

          <h2>Economic Details</h2>
          <label htmlFor="income">Annual Family Income:</label>
          <select id="income" name="income" required>
            <option value="<1lakh">Less than ₹1,00,000</option>
            <option value="1-2.5lakh">Between ₹1,00,000 - ₹2,50,000</option>
            <option value="2.5-8lakh">Between ₹2,50,000 - ₹8,00,000</option>
            <option value=">8lakh">More than ₹8,00,000</option>
          </select>

          <label htmlFor="location">Location:</label>
          <select id="location" name="location" required>
            <option value="urban">Urban Slum</option>
            <option value="rural">Rural Village</option>
          </select>

          <h2>Social Details</h2>
          <label htmlFor="caste">Caste Category:</label>
          <select id="caste" name="caste" required>
            <option value="general">General</option>
            <option value="sc">SC</option>
            <option value="st">ST</option>
            <option value="obc">OBC</option>
            <option value="nt-dnt">NT/DNT</option>
          </select>

          <label htmlFor="religion">Religious Affiliation:</label>
          <select id="religion" name="religion" required>
            <option value="hindu">Hindu</option>
            <option value="muslim">Muslim</option>
            <option value="christian">Christian</option>
            <option value="sikh">Sikh</option>
            <option value="buddhist">Buddhist</option>
            <option value="jain">Jain</option>
            <option value="parsi">Parsi</option>
          </select>

          <h2>Health Status</h2>
          <label htmlFor="disabilities">Physical or Mental Disabilities:</label>
          <input type="text" id="disabilities" name="disabilities" placeholder="e.g., Divyangjan" />

          <label htmlFor="illnesses">Chronic/Communicable Diseases:</label>
          <input type="text" id="illnesses" name="illnesses" placeholder="e.g., Cancer, TB" />

          <label htmlFor="maternal-health">Maternal and Child Health Needs:</label>
          <input type="text" id="maternal-health" name="maternal-health" placeholder="e.g., Pregnancy" />

          <h2>Occupational Details</h2>
          <label htmlFor="occupation">Occupation Type:</label>
          <select id="occupation" name="occupation" required>
            <option value="small-farmer">Small Farmer</option>
            <option value="tenant-farmer">Tenant Farmer</option>
            <option value="daily-wage">Daily Wage Worker</option>
            <option value="salaried">Salaried Employee</option>
            <option value="entrepreneur">Entrepreneur</option>
            <option value="business">Business</option>
          </select>

          <label htmlFor="occupation-needs">Specific Occupation Needs:</label>
          <input type="text" id="occupation-needs" name="occupation-needs" placeholder="e.g., Loans, Skill Training" />

          <h2>Education and Skills</h2>
          <label htmlFor="education-level">Current Education Level:</label>
          <select id="education-level" name="education-level" required>
            <option value="illiterate">Illiterate</option>
            <option value="primary">Primary School</option>
            <option value="secondary">Secondary School</option>
            <option value="higher-education">Higher Education</option>
          </select>

          <label htmlFor="vocational-training">Vocational Training Status:</label>
          <select id="vocational-training" name="vocational-training" required>
            <option value="untrained">Untrained</option>
            <option value="partially-trained">Partially Trained</option>
            <option value="fully-trained">Fully Trained</option>
          </select>

          <button type="submit">Next</button>
        </form>
      </main>
    </div>
  );
};

export default PersonalInfo;
