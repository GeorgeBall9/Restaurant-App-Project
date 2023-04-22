import "./CheckInConfirmationPopup.css";
import {addRestaurantCheckIn, checkInExists, removeRestaurantCheckIn} from "../../../firebase/firebase";
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
import FormField from "../../../common/components/FormField/FormField";

const CheckInConfirmationPopup = ({restaurant, name, checkedIn}) => {

    const restaurantId = restaurant?.id;

    const dispatch = useDispatch();

    const userId = useSelector(selectUserId);
    const checkedInRestaurants = useSelector(selectCheckedInRestaurants);

    const [lastCheckIn, setLastCheckIn] = useState(null);
    const [checkInDate, setCheckInDate] = useState(new Date().toISOString().split("T")[0]);
    const [feedback, setFeedback] = useState("");

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
        } else {
            const checkedInOnDate = await checkInExists(userId, checkInDate, restaurantId);

            if (checkedInOnDate) {
                setFeedback("You already checked in on this date!");
                return;
            }

            const newCheckIn = await addRestaurantCheckIn(userId, checkInDate, restaurant);
            dispatch(addCheckedInRestaurant(newCheckIn));
        }

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

            <p><span>Check {checkedIn ? "out" : "in"}</span> at {name}?</p>

            <div className="buttons-container">
                <button onClick={handleYesClick}>Yes</button>
                <button onClick={handleNoClick}>No</button>
            </div>
        </div>
    );
};

export default CheckInConfirmationPopup;