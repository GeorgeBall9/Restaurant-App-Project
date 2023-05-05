import "./CheckInConfirmationPopup.css";
import {
    addRestaurantCheckIn,
    checkInExists,
    getLastCheckInToRestaurantByUserId,
    removeRestaurantCheckIn
} from "../../../../firebase/firebase";
import {selectFriends, selectUserId,} from "../../../../features/user/userSlice";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import FormField from "../../../../common/components/FormField/FormField";
import {faCircleCheck, faPlus, faXmark} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import UserIcon from "../../../../common/components/UserIcon/UserIcon";
import PrimaryButton from "../../../../common/components/PrimaryButton/PrimaryButton";
import InversePrimaryButton from "../../../../common/components/InversePrimaryButton/InversePrimaryButton";

const CheckInConfirmationPopup = ({restaurant, checkedIn, closePopup, setCheckedIn}) => {

    const userId = useSelector(selectUserId);
    const friends = useSelector(selectFriends);

    const [lastCheckIn, setLastCheckIn] = useState(null);
    const [checkInDate, setCheckInDate] = useState(new Date().toISOString().split("T")[0]);
    const [feedback, setFeedback] = useState("");
    const [selectFriendsIsVisible, setSelectFriendIsVisible] = useState(false);
    const [selectedFriends, setSelectedFriends] = useState([]);
    const [addFriendsButtonText, setAddFriendsButtonText] = useState("Add friends");

    useEffect(() => {
        if (!restaurant || !userId) return;

        getLastCheckInToRestaurantByUserId(userId, restaurant.id)
            .then(data => setLastCheckIn(data));
    }, [restaurant, userId]);

    const handleYesClick = async () => {
        if (checkedIn) {
            await removeRestaurantCheckIn(lastCheckIn.id);
            setCheckedIn(false);
        } else {
            if (+new Date() < +new Date(checkInDate)) {
                setFeedback("You can only check in today or earlier!");
                return;
            }

            const checkedInOnDate = await checkInExists(userId, checkInDate, restaurant.id);

            if (checkedInOnDate) {
                setFeedback("You already checked in on this date!");
                return;
            }

            await addRestaurantCheckIn(userId, checkInDate, restaurant, selectedFriends);
            setCheckedIn(true);
        }

        closePopup();
    };

    const handleDateChange = ({target}) => {
        setFeedback("");
        setCheckInDate(target.value);
    };

    const handleAddFriendsClick = () => {
        if (addFriendsButtonText === "Add friends") {
            setAddFriendsButtonText("Clear");
        } else {
            setSelectedFriends([]);
            setAddFriendsButtonText("Add friends");
        }

        setSelectFriendIsVisible(selectFriendsIsVisible => !selectFriendsIsVisible);
    };

    const handleFriendCardClick = (id) => {
        setSelectedFriends(selectedFriends => {
            if (selectedFriends.includes(id)) {
                return selectedFriends.filter(friendId => friendId !== id);
            } else {
                return [...selectedFriends, id];
            }
        });
    };

    return (
        <div className="confirm-checkin-popup">
            {!checkedIn && lastCheckIn && (
                <p>You last checked in on {new Date(lastCheckIn.date).toLocaleDateString()}.</p>
            )}

            {feedback && <p className="feedback">{feedback}</p>}

            {!checkedIn && (
                <div className="date-container">
                    <FormField
                        label="Check in date"
                        name="visitDate"
                        type="date"
                        value={checkInDate}
                        onChangeHandler={handleDateChange}
                    />
                </div>
            )}

            {!checkedIn && friends?.length > 0 && (
                <button className="add-friend-button" onClick={handleAddFriendsClick}>
                    {addFriendsButtonText}
                    <FontAwesomeIcon icon={selectFriendsIsVisible ? faXmark : faPlus} className="icon"/>
                </button>
            )}

            {selectFriendsIsVisible && (
                <div className="select-friends">
                    {friends.map(({id, displayName, profilePhotoUrl}) => (
                        <div key={id} className="select-friend-card" onClick={() => handleFriendCardClick(id)}>
                            <div className="icon-container">
                                <UserIcon
                                    size="small"
                                    imageUrl={profilePhotoUrl}
                                />

                                {selectedFriends.includes(id) && (
                                    <FontAwesomeIcon icon={faCircleCheck} className="icon"/>
                                )}
                            </div>

                            <p>{displayName}</p>
                        </div>
                    ))}
                </div>
            )}

            {selectedFriends.length > 0 && (
                <p className="friends-selected-count">
                    {selectedFriends.length} friend{selectedFriends.length > 1 ? "s" : ""} selected
                </p>
            )}

            <p><span>Check {checkedIn ? "out" : "in"}</span> at {restaurant.name}?</p>

            <div className="buttons-container">
                <PrimaryButton text="Yes" handleClick={handleYesClick}/>
                <InversePrimaryButton text="No" handleClick={closePopup}/>
            </div>
        </div>
    );
};

export default CheckInConfirmationPopup;