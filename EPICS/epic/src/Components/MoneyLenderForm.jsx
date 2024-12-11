import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './MoneyLenderForm.css';

const MoneyLenderForm = () => {
  const [language, setLanguage] = useState("english"); // Language state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Gather form data
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      // Send data to the server
      await axios.post("http://localhost:3000/moneylenders", data);
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
      {/* Language Toggle Button */}
      <button onClick={toggleLanguage} className="language-toggle">
        {language === "english" ? "Switch to Hindi" : "Switch to English"}
      </button>

      <main>
        <form onSubmit={handleSubmit}>
          <h2>{language === "english" ? "Money Lender Details" : "पैसे उधार देने वाले विवरण"}</h2>

          {/* Name */}
          <label htmlFor="name">{language === "english" ? "Name:" : "नाम:"}</label>
          <input type="text" id="name" name="name" required />

          {/* Age */}
          <label htmlFor="age">{language === "english" ? "Age:" : "उम्र:"}</label>
          <input type="number" id="age" name="age" min="18" required />

          {/* Location */}
          <label htmlFor="location">{language === "english" ? "Location:" : "स्थान:"}</label>
          <input type="text" id="location" name="location" required />

          {/* Pin Code */}
          <label htmlFor="pinCode">{language === "english" ? "Pin Code:" : "पिन कोड:"}</label>
          <input type="text" id="pinCode" name="pinCode" required />

          {/* Money You Can Lend */}
          <label htmlFor="amountLend">{language === "english" ? "Amount You Can Lend (₹):" : "आप जो राशि उधार दे सकते हैं (₹):"}</label>
          <input type="number" id="amountLend" name="amountLend" min="1000" required />

          {/* Interest Rate */}
          <label htmlFor="interestRate">{language === "english" ? "Interest Rate (%):" : "ब्याज दर (%):"}</label>
          <input type="number" id="interestRate" name="interestRate" min="1" max="100" required />

          {/* Area of Lend */}
          <label htmlFor="area">{language === "english" ? "Area/Region for Lending:" : "उधार देने का क्षेत्र/क्षेत्र:"}</label>
          <input type="text" id="area" name="area" required />

          {/* Requirements */}
          <h3>{language === "english" ? "Additional Requirements" : "अतिरिक्त आवश्यकताएँ"}</h3>
          <div className="requirements">
            <div>
              <input type="checkbox" id="loanHistory" name="requirements" value="loanHistory" />
              <label htmlFor="loanHistory">{language === "english" ? "Check for Loan History" : "ऋण इतिहास की जांच करें"}</label>
            </div>
            <div>
              <input type="checkbox" id="collateral" name="requirements" value="collateral" />
              <label htmlFor="collateral">{language === "english" ? "Collateral Needed" : "संपत्ति की आवश्यकता"}</label>
            </div>
            <div>
              <input type="checkbox" id="guarantor" name="requirements" value="guarantor" />
              <label htmlFor="guarantor">{language === "english" ? "Guarantor Needed" : "गारंटर की आवश्यकता"}</label>
            </div>
            <div>
              <input type="checkbox" id="repaymentTerms" name="requirements" value="repaymentTerms" />
              <label htmlFor="repaymentTerms">{language === "english" ? "Clear Repayment Terms" : "स्पष्ट पुनर्भुगतान शर्तें"}</label>
            </div>
            <div>
              <input type="checkbox" id="backgroundCheck" name="requirements" value="backgroundCheck" />
              <label htmlFor="backgroundCheck">{language === "english" ? "Background Check" : "पृष्ठभूमि जांच"}</label>
            </div>
          </div>

          {/* Additional Notes */}
          <label htmlFor="notes">{language === "english" ? "Additional Notes (Optional):" : "अतिरिक्त नोट्स (वैकल्पिक):"}</label>
          <textarea id="notes" name="notes" rows="4" cols="50"></textarea>

          {/* Submit Button */}
          <button type="submit">
            {language === "english" ? "Submit" : "जमा करें"}
          </button>
        </form>
      </main>
    </div>
  );
};

export default MoneyLenderForm;
