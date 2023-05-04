import "./CheckInsCard.css";
import UserIcon from "../../../../common/components/UserIcon/UserIcon";
import { useEffect, useState } from "react";

const CheckInsCard = ({ restaurant, date, userData, friendData }) => {
    const [allUsers, setAllUsers] = useState([]);

    useEffect(() => {
        setAllUsers([userData, ...friendData]);
    }, [userData, friendData]);

    const formattedDate = new Date(date).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });

    const renderUserIcon = (user) => {
        return (
            <div className="user-icon-wrapper">
                <UserIcon
                    size="small"
                    colour={user.iconColor}
                    imageUrl={user.profilePhotoUrl}
                />
            </div>
        );
    };

    return (
        <div className="check-ins-card">
            <div className="card-header">
                <div className="user-icons">
                    {allUsers.map((user, index) => (
                        <div key={index}>{renderUserIcon(user)}</div>
                    ))}
                </div>
                <p className="visit-date">Visited: {formattedDate}</p>
            </div>
            <h3 className="restaurant-name">{restaurant}</h3>
        </div>
    );
};

export default CheckInsCard;
