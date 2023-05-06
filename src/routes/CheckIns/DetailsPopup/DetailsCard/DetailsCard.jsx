import "./DetailsCard.css";
import UserIcon from "../../../../common/components/UserIcon/UserIcon";
import {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendarAlt, faCamera, faPen, faTrash} from "@fortawesome/free-solid-svg-icons";
import InteractionButton from "../../../../common/components/InteractionButton/InteractionButton";
import CheckInPopupView from "../../../../common/CheckInPopupView/CheckInPopupView";
import {useSelector} from "react-redux";
import {selectFriends} from "../../../../features/user/userSlice";

const DetailsCard = ({
                         restaurant,
                         date,
                         userData,
                         friendData,
                         photoData,
                         isFriendsPage,
                         showPhotos,
                         closePopup,
                         setSelectedCheckIn
                     }) => {

    const allFriends = useSelector(selectFriends);

    const [allUsers, setAllUsers] = useState([]);
    const [editPopupIsVisible, setEditPopupIsVisible] = useState(false);

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

    const handleAddPhotoClick = () => {
        setSelectedCheckIn();
        showPhotos();
        closePopup();
    };

    const handleEditClick = () => {
        setEditPopupIsVisible(true);
    };

    const handleDeleteClick = () => {};

    return (
        <div className="check-ins-card">
            {editPopupIsVisible && (
                <CheckInPopupView
                    restaurant={restaurant}
                    closePopup={() => setEditPopupIsVisible(false)}
                    friends={allFriends}
                    friendsSelected={friendData}
                />
            )}

            <div className="card-header">
                <h3>{restaurant.name}</h3>

                {!isFriendsPage && (
                    <div className="buttons-container">
                        <InteractionButton icon={faPen} handleClick={handleEditClick}/>

                        <InteractionButton icon={faTrash} handleClick={handleDeleteClick}/>
                    </div>
                )}
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
                {photoData.map(({id, url, alt}) => (
                    <div key={id} className="image-preview-container">
                        <img src={url} alt={alt}/>
                    </div>
                ))}

                <button className="add-photo-button" onClick={handleAddPhotoClick}>
                    <FontAwesomeIcon className="icon" icon={faCamera}/>
                </button>
            </div>
        </div>
    );
};

export default DetailsCard;
