import "./CheckInConfirmationPopup.css";
import {addRestaurantCheckIn, checkInExists, removeRestaurantCheckIn} from "../../../firebase/firebase";
import {
    addCheckedInRestaurant,
    selectCheckedInRestaurants, selectFriends,
    selectUserId,
    setCheckedInRestaurants
} from "../../user/userSlice";
import {hideOverlay} from "../../overlay/overlaySlice";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {hideCheckInConfirmation, resetCheckInFeedback, showCheckInFeedback} from "../checkInConfirmationSlice";
import FormField from "../../../common/components/FormField/FormField";
import {faCircleCheck, faPlus, faXmark} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import UserIcon from "../../../common/components/UserIcon/UserIcon";

const CheckInConfirmationPopup = ({restaurant, name, checkedIn}) => {

    const restaurantId = restaurant?.id;

    const dispatch = useDispatch();

    const userId = useSelector(selectUserId);
    const checkedInRestaurants = useSelector(selectCheckedInRestaurants);
    const friends = useSelector(selectFriends);

    const [lastCheckIn, setLastCheckIn] = useState(null);
    const [checkInDate, setCheckInDate] = useState(new Date().toISOString().split("T")[0]);
    const [feedback, setFeedback] = useState("");
    const [selectFriendsIsVisible, setSelectFriendIsVisible] = useState(false);
    const [selectedFriends, setSelectedFriends] = useState([]);
    const [addFriendsButtonText, setAddFriendsButtonText] = useState("Add friends");

    useEffect(() => {
        if (!restaurantId || !checkedInRestaurants.length) return;

        const lastCheckedIn = checkedInRestaurants
            .filter(checkIn => checkIn.restaurantId === restaurantId)
            .sort((a, b) => a.date - b.date)
            .at(-1);

        setLastCheckIn(lastCheckedIn ? new Date(lastCheckedIn.date).toLocaleDateString() : null);
    }, [restaurantId, checkedInRestaurants]);

    const handleYesClick = async () => {
        if (checkedIn) {
            const checkedInData = await removeRestaurantCheckIn(userId, restaurantId);
            dispatch(setCheckedInRestaurants(checkedInData));
            dispatch(showCheckInFeedback("remove"));
        } else {
            if (+new Date() < +new Date(checkInDate)) {
                setFeedback("You can only check in today or earlier!");
                return;
            }

            const checkedInOnDate = await checkInExists(userId, checkInDate, restaurantId);

            if (checkedInOnDate) {
                setFeedback("You already checked in on this date!");
                return;
            }

            const newCheckIn = await addRestaurantCheckIn(userId, checkInDate, restaurant, selectedFriends);
            dispatch(addCheckedInRestaurant(newCheckIn));
            dispatch(showCheckInFeedback("add"));
        }

        setTimeout(() => dispatch(resetCheckInFeedback()), 2000);

        dispatch(hideOverlay());
        dispatch(hideCheckInConfirmation());
    };

    const handleNoClick = () => {
        dispatch(hideOverlay());
        dispatch(hideCheckInConfirmation());
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
                <p>You last checked in on {lastCheckIn}.</p>
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
                    {friends.map(({id, displayName, iconColour}) => (
                        <div key={id} className="select-friend-card" onClick={() => handleFriendCardClick(id)}>
                            <div className="icon-container">
                                <UserIcon size="small" colour={iconColour}/>

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

            <p><span>Check {checkedIn ? "out" : "in"}</span> at {name}?</p>

            <div className="buttons-container">
                <button onClick={handleYesClick}>Yes</button>
                <button onClick={handleNoClick}>No</button>
            </div>
        </div>
    );
};

export default CheckInConfirmationPopup;