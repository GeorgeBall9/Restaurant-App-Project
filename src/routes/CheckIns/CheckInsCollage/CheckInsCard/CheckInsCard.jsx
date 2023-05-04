import React from "react";
import "./CheckInsCard.css";

const CheckInsCard = ({ restaurant, date, userIcon, friendsIcons }) => {
    return (
        <div className="check-ins-card">
            <div className="user-icons">
                <img src={userIcon} alt="User Icon" />
                {friendsIcons && friendsIcons.map((icon, index) => (
                    <img key={index} src={icon} alt={`Friend ${index + 1}`} />
                ))}
            </div>
            <h3>{restaurant}</h3>
            <p>{date}</p>
            
        </div>
    );
};

export default CheckInsCard;
