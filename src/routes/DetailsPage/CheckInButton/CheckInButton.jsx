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
import {hideOverlay, showOverlay} from "../../../features/overlay/overlaySlice";
import CheckInConfirmationPopup
    from "../../../features/checkInConfirmation/CheckInConfirmationPopup/CheckInConfirmationPopup";
import {
    selectCheckInConfirmationIsVisible, setCheckedInStatus,
    showCheckInConfirmation
} from "../../../features/checkInConfirmation/checkInConfirmationSlice";
import {useNavigate} from "react-router-dom";

const CheckInButton = ({restaurant}) => {

    const id = restaurant?.id;

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const userId = useSelector(selectUserId);
    const checkedInRestaurants = useSelector(selectCheckedInRestaurants);

    const [checkedIn, setCheckedIn] = useState(false);

    useEffect(() => {
        if (!checkedInRestaurants.length) {
            setCheckedIn(false);
            return;
        }

        setCheckedIn(checkedInRestaurants
            .find(checkIn => {
                const now = new Date().toLocaleDateString();
                const dateString = new Date(checkIn.date).toLocaleDateString();

                return checkIn.restaurant.id === id && dateString === now;
            }));
    }, [checkedInRestaurants]);

    useEffect(() => {
        dispatch(setCheckedInStatus(checkedIn));
    }, [checkedIn]);

    const handleClick = () => {
        if (!userId) {
            navigate("/sign-in");
        } else {
            dispatch(showOverlay());
            dispatch(showCheckInConfirmation());
        }
    };

    return (
        <button className="check-in-button" onClick={handleClick}>
            {checkedIn ? "Checked in" : "Check in"}
            <FontAwesomeIcon icon={checkedIn ? faSolidCircleCheck : faCircleCheck} className="icon"/>
        </button>
    );
};

export default CheckInButton;