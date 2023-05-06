import "./DetailsCard.css";
import UserIcon from "../../../../common/components/UserIcon/UserIcon";
import {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendarAlt, faCirclePlus, faPen, faTrash} from "@fortawesome/free-solid-svg-icons";
import InteractionButton from "../../../../common/components/InteractionButton/InteractionButton";

const DetailsCard = ({restaurantName, date, userData, friendData, isFriendsPage}) => {

    const [allUsers, setAllUsers] = useState([]);

    useEffect(() => {
        if (!userData || !friendData) return;

        if (isFriendsPage) {
            setAllUsers([...friendData]);
        } else {
            setAllUsers([userData, ...friendData]);
        }
    }, [userData, friendData, isFriendsPage]);

    const formattedDate = new Date(date).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });

    return (
        <div className="check-ins-card">
            <div className="card-header">
                <h3>{restaurantName}</h3>

                <div className="buttons-container">
                    <InteractionButton icon={faPen}/>

                    <InteractionButton icon={faTrash}/>
                </div>
            </div>

            <div className="visit-date">
                <FontAwesomeIcon icon={faCalendarAlt} className="calendar-icon"/>
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

            <div className="photo-previews-container">
                <button className="add-photo-button" onClick={() => console.log("add")}>
                    <FontAwesomeIcon className="icon" icon={faCirclePlus} />
                </button>
            </div>
        </div>
    );
};

export default DetailsCard;
