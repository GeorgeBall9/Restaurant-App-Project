import "./CheckInButton.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleCheck as faSolidCircleCheck} from "@fortawesome/free-solid-svg-icons";
import {faCircleCheck} from "@fortawesome/free-regular-svg-icons";
import {useDispatch, useSelector} from "react-redux";
import {selectUserId} from "../../../features/user/userSlice";
import {useEffect, useState} from "react";
import {showOverlay} from "../../../features/overlay/overlaySlice";
import {
    selectCheckedIn,
    setCheckedInStatus,
    showCheckInConfirmation
} from "../../../features/checkInConfirmation/checkInConfirmationSlice";
import {useNavigate} from "react-router-dom";
import {getLastCheckInToRestaurantByUserId} from "../../../firebase/firebase";

const CheckInButton = ({restaurantId}) => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const userId = useSelector(selectUserId);
    const checkedIn = useSelector(selectCheckedIn);

    const [today] = useState(new Date().toLocaleDateString());

    useEffect(() => {
        if (!restaurantId || !userId) return;

        console.log({restaurantId})

        getLastCheckInToRestaurantByUserId(userId, restaurantId)
            .then(data => {
                if (data) {
                    const dateString = new Date(data.date).toLocaleDateString();
                    dispatch(setCheckedInStatus(today === dateString));
                } else {
                    dispatch(setCheckedInStatus(false));
                }
            });
    }, [restaurantId, userId]);

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