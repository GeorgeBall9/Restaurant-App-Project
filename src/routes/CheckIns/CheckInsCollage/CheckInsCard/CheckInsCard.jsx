import "./CheckInsCard.css";
import UserIcon from "../../../../common/components/UserIcon/UserIcon";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";

const CheckInsCard = ({ restaurant, date, userData, friendData }) => {

    const [allUsers, setAllUsers] = useState([]);

    useEffect(() => {
        if (!userData || !friendData) return;
        setAllUsers([userData, ...friendData]);
    }, [userData, friendData]);

    const formattedDate = new Date(date).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });

    const renderUserIcon = (user) => {
        console.log("Rendering user icon for:", user);
        return (
            <div className="user-icon-wrapper">
                <UserIcon
                    size="small"
                    colour={user.iconColour}
                    imageUrl={user.profilePhotoUrl}
                />
            </div>
        );
    };

    console.log("User data:", userData);
    console.log("Friend data:", friendData);

    return (
        <div className="check-ins-card">
            <div className="card-header">
                <div className="visit-date">
                    <FontAwesomeIcon icon={faCalendarAlt} className="calendar-icon" />
                    <span>{formattedDate}</span>
                </div>
                <div className="user-icons">
                    {allUsers.map((user, index) => (
                        <div key={index}>{renderUserIcon(user)}</div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CheckInsCard;
