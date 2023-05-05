import "./CheckInsCard.css";
import UserIcon from "../../../../common/components/UserIcon/UserIcon";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";

const CheckInsCard = ({date, userData, friendData }) => {

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

    return (
        <div className="check-ins-card">
            <div className="card-header">
                <div className="visit-date">
                    <FontAwesomeIcon icon={faCalendarAlt} className="calendar-icon" />
                    <span>{formattedDate}</span>
                </div>

                <div className="user-icons">
                    {allUsers.map((user, index) => (
                        <div key={index}>
                            <UserIcon
                                size="small"
                                imageUrl={user.profilePhotoUrl}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CheckInsCard;
