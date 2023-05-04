import React from "react";
import "./CheckInsCard.css";

const CheckInsCard = ({ restaurant, date, userIcon, friendsIcons }) => {
  const formattedDate = new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <div className="check-ins-card">
      <div className="card-header">
        <div className="user-icons">
          <img src={userIcon} alt="User Icon" />
          {friendsIcons &&
            friendsIcons.map((icon, index) => (
              <img key={index} src={icon} alt={`Friend ${index + 1}`} />
            ))}
        </div>
        <p className="visit-date">Visited: {formattedDate}</p>
      </div>
      <h3 className="restaurant-name">{restaurant}</h3>
    </div>
  );
};

export default CheckInsCard;
