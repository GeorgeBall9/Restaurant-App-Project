import "./CheckInButton.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleCheck as faSolidCircleCheck} from "@fortawesome/free-solid-svg-icons";
import {faCircleCheck} from "@fortawesome/free-regular-svg-icons";
import {useDispatch, useSelector} from "react-redux";
import {
    addCheckedInRestaurant,
    removeCheckedInRestaurant,
    selectCheckedInRestaurants, selectUserId, setCheckedInRestaurants
} from "../../../features/user/userSlice";
import {useEffect, useState} from "react";
import {addRestaurantCheckIn, removeRestaurantCheckIn} from "../../../firebase/firebase";

const CheckInButton = ({id, name}) => {

    const dispatch = useDispatch();

    const userId = useSelector(selectUserId);
    const checkedInRestaurants = useSelector(selectCheckedInRestaurants);

    const [checkedIn, setCheckedIn] = useState(false);
    const [lastCheckIn, setLastCheckIn] = useState(null);
    const [popupVisible, setPopupVisible] = useState(false);

    useEffect(() => {
        if (!checkedInRestaurants.length) {
            setCheckedIn(false);
            return;
        }

        setCheckedIn(checkedInRestaurants
            .find(checkIn => {
                const now = new Date().toLocaleDateString();
                const dateString = new Date(checkIn.date).toLocaleDateString();

                return checkIn.restaurantId === id && dateString === now;
            }));

        const lastCheckedIn = checkedInRestaurants
            .filter(checkIn => checkIn.restaurantId === id)
            .sort((a, b) => a.date - b.date)
            .at(-1);

        setLastCheckIn(lastCheckedIn ? new Date(lastCheckedIn.date).toLocaleDateString() : null);
    }, [checkedInRestaurants]);

    const handleCheckInClick = () => {
        setPopupVisible(true);
    };

    const handleYesClick = async () => {
        if (checkedIn) {
            const checkedInData = await removeRestaurantCheckIn(userId, id);
            dispatch(setCheckedInRestaurants(checkedInData));
        } else {
            const newCheckIn = await addRestaurantCheckIn(userId, id);
            dispatch(addCheckedInRestaurant(newCheckIn));
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
                    {!checkedIn && lastCheckIn && (
                        <p>You last checked in on {lastCheckIn}.</p>
                    )}

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