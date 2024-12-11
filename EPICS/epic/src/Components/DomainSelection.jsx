import React from "react";

const DomainSelection = () => {
  return (
    <form>
      <h2>Select Your Domain</h2>
      <p>Preferred Schemes:</p>
      <div className="preferred-scheme">
        <div>
        <input type="checkbox" id="medical" name="preferences" value="medical" />
        <label htmlFor="medical">Medical/Healthcare</label>
        </div>
        <div>
        <input type="checkbox" id="agriculture" name="preferences" value="agriculture" />
        <label htmlFor="agriculture">Agriculture</label>
        </div>
        <div>
        <input type="checkbox" id="loans" name="preferences" value="loans" />
        <label htmlFor="loans">Loans/Financial Aid</label>
        </div>
        <div>
        <input type="checkbox" id="housing" name="preferences" value="housing" />
        <label htmlFor="housing">Housing</label>
        </div>
        <div>
        <input type="checkbox" id="employment" name="preferences" value="employment" />
        <label htmlFor="employment">Employment</label>
        </div>
        <div>
        <input type="checkbox" id="women" name="preferences" value="women" />
        <label htmlFor="women">Women Empowerment</label>
        </div>
        <div>
        <input type="checkbox" id="skilldevelopment" name="preferences" value="skilldevelopment" />
        <label htmlFor="skilldevelopment">Skill Development </label>
        </div>
        <div>
        <input type="checkbox" id="entrepreneurship" name="preferences" value="entrepreneurship" />
        <label htmlFor="entrepreneurship">Entrepreneurship</label>
        </div>
        <div>
        <input type="checkbox" id="Environmental Support" name="preferences" value="Environmental Support" />
        <label htmlFor="Environmental Support">Environmental Support</label>
        </div>
     </div>


      

      <button type="submit">Submit</button>
    </form>
  );
}

export default DomainSelection;
