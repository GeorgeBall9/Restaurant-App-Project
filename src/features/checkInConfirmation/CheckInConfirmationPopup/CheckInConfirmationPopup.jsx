import "./CheckInConfirmationPopup.css";
import {addRestaurantCheckIn, removeRestaurantCheckIn} from "../../../firebase/firebase";
import {
    addCheckedInRestaurant,
    selectCheckedInRestaurants,
    selectUserId,
    setCheckedInRestaurants
} from "../../user/userSlice";
import {hideOverlay} from "../../overlay/overlaySlice";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {hideCheckInConfirmation} from "../checkInConfirmationSlice";

const CheckInConfirmationPopup = ({id, name, checkedIn}) => {

    const dispatch = useDispatch();

    const userId = useSelector(selectUserId);
    const checkedInRestaurants = useSelector(selectCheckedInRestaurants);

    const [lastCheckIn, setLastCheckIn] = useState(null);

    useEffect(() => {
        if (!id || !checkedInRestaurants.length) return;

        const lastCheckedIn = checkedInRestaurants
            .filter(checkIn => checkIn.restaurantId === id)
            .sort((a, b) => a.date - b.date)
            .at(-1);

        setLastCheckIn(lastCheckedIn ? new Date(lastCheckedIn.date).toLocaleDateString() : null);
    }, [id, checkedInRestaurants]);

    const handleYesClick = async () => {
        if (checkedIn) {
            const checkedInData = await removeRestaurantCheckIn(userId, id);
            dispatch(setCheckedInRestaurants(checkedInData));
        } else {
            const newCheckIn = await addRestaurantCheckIn(userId, id);
            dispatch(addCheckedInRestaurant(newCheckIn));
        }

        dispatch(hideOverlay());
        dispatch(hideCheckInConfirmation());
    };

    const handleNoClick = () => {
        dispatch(hideOverlay());
        dispatch(hideCheckInConfirmation());
    };

    return (
        <div className="confirm-checkin-popup">
            {!checkedIn && lastCheckIn && (
                <p>You last checked in on {lastCheckIn}.</p>
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