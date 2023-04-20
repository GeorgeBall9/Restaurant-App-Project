import React from "react";
import "./CheckInsCollage.css";

import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CheckInsCollage = ({ restaurant, onClose }) => {
    const handleBackClick = () => {
        onClose();
    };

    return (
        <div className="collage-popup">
            <header>
                <button onClick={handleBackClick}>
                    <FontAwesomeIcon className="icon" icon={faArrowLeft} />
                    Back
                </button>
                <h2>{restaurant.name}</h2>
            </header>
            {/* Render the collage of photos here */}
        </div>
    );
};

export default CheckInsCollage;