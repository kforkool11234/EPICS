import React from "react";
import { useLocation } from "react-router-dom";

const Schemes = () => {
    const location = useLocation();
    const { schemes} = location.state || {}; // Retrieve state data

    return (
        <div>

            <h2>Eligible Schemes</h2>
            <textarea name="schemes" id="schemes" value={schemes} style={{ height: '500px' }}></textarea>
        </div>
    );
};

export default Schemes;
