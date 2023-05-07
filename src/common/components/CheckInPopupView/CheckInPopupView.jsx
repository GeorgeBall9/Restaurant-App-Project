import "./CheckInPopupView.css";
import FormField from "../FormField/FormField";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleCheck as solidCircleCheck, faPlus, faXmark} from "@fortawesome/free-solid-svg-icons";
import UserIcon from "../UserIcon/UserIcon";
import InteractionButton from "../ButtonViews/InteractionButton/InteractionButton";
import {faCircleCheck} from "@fortawesome/free-regular-svg-icons";
import PrimaryButton from "../ButtonViews/PrimaryButton/PrimaryButton";
import InversePrimaryButton from "../ButtonViews/InversePrimaryButton/InversePrimaryButton";
import {useEffect, useState} from "react";
import Overlay from "../Overlay/Overlay";

const CheckInPopupView = ({
                              restaurant,
                              date,
                              friends,
                              friendsSelected,
                              closePopup,
                              confirmCheckIn,
                              feedback,
                              resetFeedback
                          }) => {

    const [checkInDate, setCheckInDate] = useState((date ? new Date(date) : new Date())
        .toISOString()
        .split("T")[0]);
    const [selectFriendsIsVisible, setSelectFriendIsVisible] = useState(false);
    const [selectedFriends, setSelectedFriends] = useState([]);
    const [addFriendsButtonText, setAddFriendsButtonText] = useState("Add friends");

    useEffect(() => {
        if (!friendsSelected) return;

        setSelectedFriends(friendsSelected.map(({id}) => id));
    }, [friendsSelected]);

    const handleDateChange = ({target}) => {
        setCheckInDate(target.value);
        resetFeedback();
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
        <>
            <div className="confirm-checkin-popup">
                {feedback && <p className="feedback">{feedback}</p>}

                <div className="date-container">
                    <FormField
                        label="Check in date"
                        name="visitDate"
                        type="date"
                        value={checkInDate}
                        onChangeHandler={handleDateChange}
                    />
                </div>

                {friends?.length > 0 && (
                    <button className="add-friend-button" onClick={handleAddFriendsClick}>
                        {addFriendsButtonText}
                        <FontAwesomeIcon icon={selectFriendsIsVisible ? faXmark : faPlus} className="icon"/>
                    </button>
                )}

                {selectFriendsIsVisible && (
                    <div className="select-friends">
                        {friends.map(({id, displayName, profilePhotoUrl}) => (
                            <div key={id} className="select-friend-card" onClick={() => handleFriendCardClick(id)}>
                                <div>
                                    <UserIcon
                                        size="xSmall"
                                        imageUrl={profilePhotoUrl}
                                    />

                                    <p>{displayName}</p>
                                </div>

                                <InteractionButton
                                    icon={faCircleCheck}
                                    solidIcon={solidCircleCheck}
                                    isSolid={selectedFriends.includes(id)}
                                />
                            </div>
                        ))}
                    </div>
                )}

                {selectedFriends.length > 0 && (
                    <p className="friends-selected-count">
                        {selectedFriends.length} friend{selectedFriends.length > 1 ? "s" : ""} selected
                    </p>
                )}

                <p><span>Check in</span> at {restaurant.name}?</p>

                <div className="buttons-container">
                    <PrimaryButton
                        text="Yes"
                        handleClick={() => confirmCheckIn(+new Date(checkInDate), selectedFriends)}
                    />

                    <InversePrimaryButton text="No" handleClick={closePopup}/>
                </div>
            </div>

            <Overlay/>
        </>
    );
};

export default CheckInPopupView;