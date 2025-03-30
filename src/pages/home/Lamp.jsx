import React from 'react';
import './Style.css'; // Ensure to import the styles

function Lamp() {
    return (
        <div className="lamp-container">
            <div className="wire"></div>
            <div className="lamp">
                <div className="light"></div>
            </div>
            <div className="light-beam"></div>
        </div>
    );
}

export default Lamp;
