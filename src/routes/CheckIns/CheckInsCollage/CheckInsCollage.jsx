import "./CheckInsCollage.css";

import { useState, useEffect } from "react";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CheckInsCollage = ({ restaurant, onClose }) => {
    const [isVisible, setIsVisible] = useState(false);

    const handleBackClick = () => {
        setIsVisible(false);
        setTimeout(() => {
            onClose();
        }, 300);
    };

    useEffect(() => {
        setIsVisible(true);
    }, []);
    
    return (
        <div className={`collage-popup ${isVisible ? "visible" : ""}`}>
            <header>
                <button onClick={handleBackClick}>
                    <FontAwesomeIcon className="icon" icon={faArrowLeft} />
                    Back
                </button>
                <h2>{restaurant.name}</h2>
            </header>
            {/* Render the collage of photos here */}
            <div className="collage-popup-photos">
                <img src={restaurant.photoUrl} alt={restaurant.name} />

            </div>
            <div className="collage-popup-function">
                <button>Add Photo</button>
            </div>
        </div>
    );
};

export default CheckInsCollage;
