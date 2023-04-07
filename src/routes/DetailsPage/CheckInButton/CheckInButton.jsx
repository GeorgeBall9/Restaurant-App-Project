import "./CheckInButton.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleCheck as faSolidCircleCheck} from "@fortawesome/free-solid-svg-icons";
import {faCircleCheck} from "@fortawesome/free-regular-svg-icons";
import {useDispatch, useSelector} from "react-redux";
import {
    addCheckedInRestaurant,
    removeCheckedInRestaurant,
    selectCheckedInRestaurants, selectUserId
} from "../../../features/user/userSlice";
import {useEffect, useState} from "react";
import {addRestaurantCheckIn, removeRestaurantCheckIn} from "../../../firebase/firebase";

const CheckInButton = ({id, name}) => {

    const dispatch = useDispatch();

    const userId = useSelector(selectUserId);
    const checkedInRestaurants = useSelector(selectCheckedInRestaurants);

    const [checkedIn, setCheckedIn] = useState(false);
    const [popupVisible, setPopupVisible] = useState(false);

    useEffect(() => {
        if (!checkedInRestaurants) return;

        setCheckedIn(checkedInRestaurants.includes(id));
    }, [checkedInRestaurants]);

    const handleCheckInClick = () => {
        setPopupVisible(true);
    };

    const handleYesClick = async () => {
        if (checkedIn) {
            await removeRestaurantCheckIn(userId, id);
            dispatch(removeCheckedInRestaurant(id));
        } else {
            await addRestaurantCheckIn(userId, id);
            dispatch(addCheckedInRestaurant(id));
        }

        setPopupVisible(false);
    };

    const handleNoClick = () => {
        setPopupVisible(false);
    };

    return (
        <>
            <button onClick={handleCheckInClick}>
                {checkedIn ? "Checked in" : "Check in"}
                <FontAwesomeIcon icon={checkedIn ? faSolidCircleCheck : faCircleCheck} className="icon"/>
            </button>

            {popupVisible && (
                <div className="confirm-checkin-popup">
                    <p>Would you like to check {checkedIn ? "out of" : "in at"} {name}?</p>

                    <div className="buttons-container">
                        <button onClick={handleYesClick}>Yes</button>
                        <button onClick={handleNoClick}>No</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default CheckInButton;