import "./DetailsCard.css";
import UserIcon from "../../../../common/components/UserIcon/UserIcon";
import {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendarAlt, faCamera, faPen, faTrash} from "@fortawesome/free-solid-svg-icons";
import InteractionButton from "../../../../common/components/ButtonViews/InteractionButton/InteractionButton";
import CheckInPopupView from "../../../../common/components/CheckInPopupView/CheckInPopupView";
import {useDispatch, useSelector} from "react-redux";
import {selectFriends, selectProfilePhotoUrl} from "../../../../features/user/userSlice";
import {removeRestaurantCheckIn, updateCheckInDoc} from "../../../../firebase/firebase";
import {removeCheckIn, setSelectedCheckIn, updateCheckIn} from "../../../../features/checkIns/checkInsSlice";
import ConfirmationPopupView from "../../../../common/components/ConfirmationPopupView/ConfirmationPopupView";
import CollageImage from "../../../../common/components/CustomCollage/CollageImage/CollageImage";

const DetailsCard = ({
                         checkIn,
                         isFriendsPage,
                         showPhotos,
                         closePopup,
                         expandPopup
                     }) => {

    const dispatch = useDispatch();

    const allFriends = useSelector(selectFriends);
    const profilePhotoUrl = useSelector(selectProfilePhotoUrl);

    const [editPopupIsVisible, setEditPopupIsVisible] = useState(false);
    const [editPopupFeedback, setEditPopupFeedback] = useState("");
    const [confirmDeletePopupIsVisible, setConfirmDeletePopupIsVisible] = useState(false);

    const formattedDate = new Date(checkIn.date).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });

    const handleAddPhotoClick = () => {
        dispatch(setSelectedCheckIn(checkIn))
        showPhotos();
    };

    const handleEditClick = () => {
        expandPopup();
        setEditPopupIsVisible(true);
    };

    const confirmEditCheckIn = async (date, friends) => {
        if (+new Date() < +new Date(date)) {
            setEditPopupFeedback("You can only check in today or earlier!");
            return;
        }

        const photoIds = checkIn.photoData.map(({id}) => id);

        const updatedCheckIn = await updateCheckInDoc(checkIn.id, date, checkIn.userData.id, friends, photoIds);
        dispatch(updateCheckIn(updatedCheckIn));

        setEditPopupIsVisible(false);
    };

    const handleDeleteClick = () => {
        expandPopup();
        setConfirmDeletePopupIsVisible(true);
    };

    const confirmDelete = async () => {
        const checkInId = checkIn.id;

        await removeRestaurantCheckIn(checkIn.id);

        dispatch(removeCheckIn(checkInId));
    };

    return (
        <div className="check-ins-card">
            {editPopupIsVisible && (
                <CheckInPopupView
                    restaurant={checkIn.restaurant}
                    date={checkIn.date}
                    closePopup={() => setEditPopupIsVisible(false)}
                    friends={allFriends}
                    friendsSelected={checkIn.friendData}
                    confirmCheckIn={confirmEditCheckIn}
                    feedback={editPopupFeedback}
                    resetFeedback={() => setEditPopupFeedback("")}
                />
            )}

            {confirmDeletePopupIsVisible && (
                <ConfirmationPopupView
                    message="Delete this check-in?"
                    handleYesClick={confirmDelete}
                    handleNoClick={() => setConfirmDeletePopupIsVisible(false)}
                />
            )}

            <div className="card-header">
                <h3>{checkIn.restaurant.name}</h3>

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
                <UserIcon
                    size="small"
                    imageUrl={profilePhotoUrl}
                />

                {checkIn.friendData.map(user => (
                    <UserIcon
                        key={user.id + checkIn.id}
                        size="small"
                        imageUrl={user.profilePhotoUrl}
                    />
                ))}
            </div>

            <div className="photo-previews-container">
                {[...checkIn.photoData].slice(0, 3).map(({id, url, alt}) => (
                    <div key={id} className="image-preview-container">
                        <CollageImage url={url} alt={alt}/>
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
