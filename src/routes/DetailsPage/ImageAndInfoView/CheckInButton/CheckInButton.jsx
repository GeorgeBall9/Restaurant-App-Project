import "./CheckInButton.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleCheck as faSolidCircleCheck, faXmark} from "@fortawesome/free-solid-svg-icons";
import {faCircleCheck} from "@fortawesome/free-regular-svg-icons";
import {useEffect, useState} from "react";
import {getLastCheckInToRestaurantByUserId} from "../../../../firebase/firebase";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectUserId} from "../../../../features/user/userSlice";
import CheckInConfirmationPopup from "../CheckInConfirmationPopup/CheckInConfirmationPopup";

const CheckInButton = ({restaurant}) => {

    const navigate = useNavigate();

    const userId = useSelector(selectUserId);

    const [checkInConfirmationIsVisible, setCheckInConfirmationIsVisible] = useState(false);
    const [checkedIn, setCheckedIn] = useState(false);
    const [checkInChange, setCheckInChange] = useState(null);
    const [feedbackIsVisible, setFeedbackIsVisible] = useState(false);

    useEffect(() => {
        if (!restaurant || !userId) return;

        const today = new Date().toLocaleDateString();

        console.log("updating checked in status")

        getLastCheckInToRestaurantByUserId(userId, restaurant.id)
            .then(data => {
                if (data) {
                    const dateString = new Date(data.date).toLocaleDateString();
                    setCheckedIn(today === dateString);
                } else {
                    setCheckedIn(false);
                }
            });
    }, [restaurant, userId]);

    useEffect(() => {
        if (!checkInChange) return;

        setFeedbackIsVisible(true);

        setTimeout(() =>  setFeedbackIsVisible(false), 2000);
    }, [checkInChange]);

    const handleClick = () => {
        if (!userId) {
            navigate("/sign-in");
        } else {
            setCheckInConfirmationIsVisible(true);
        }
    };

    return (
        <>
            <button className="check-in-button" onClick={handleClick}>
                {checkedIn ? "Checked in" : "Check in"}
                <FontAwesomeIcon icon={checkedIn ? faSolidCircleCheck : faCircleCheck} className="icon"/>
            </button>

            {checkInConfirmationIsVisible && (
                <CheckInConfirmationPopup
                    restaurant={restaurant}
                    checkedIn={checkedIn}
                    closePopup={() => setCheckInConfirmationIsVisible(false)}
                    setCheckedIn={setCheckedIn}
                    setCheckInChange={setCheckInChange}
                />
            )}

            <div className="bookmark-feedback" style={{opacity: feedbackIsVisible ? 1 : 0}}>
                {checkInChange} check-in

                <FontAwesomeIcon
                    icon={checkInChange === "Saved" ? faCircleCheck : faXmark}
                    className="bookmark-feedback-icon"
                />
            </div>
        </>
    );
};

export default CheckInButton;