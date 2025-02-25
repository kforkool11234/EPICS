import React from "react";
import { useLocation } from "react-router-dom";
import './schemes.css';

const Schemes = () => {
    const location = useLocation();
    const { schemes} = location.state || {}; // Retrieve state data

    return (
        <div className="elig">
            <h2>Eligible Schemes</h2>
            <textarea name="schemes" id="schemes" value={schemes ? schemes.replace(/\*/g, '') : ''}   style={{ height: '500px' }}></textarea>
       <div className="law"></div> </div>
    );
};

export default Schemes;
