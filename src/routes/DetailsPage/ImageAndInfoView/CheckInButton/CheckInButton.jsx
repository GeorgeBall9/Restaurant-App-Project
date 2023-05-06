import "./CheckInButton.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleCheck as faSolidCircleCheck} from "@fortawesome/free-solid-svg-icons";
import {faCircleCheck} from "@fortawesome/free-regular-svg-icons";
import {useEffect, useState} from "react";
import {addRestaurantCheckIn, checkInExists, getLastCheckInToRestaurantByUserId} from "../../../../firebase/firebase";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectFriends, selectUserId} from "../../../../features/user/userSlice";
import InteractionFeedback from "../../../../common/components/InteractionFeedback/InteractionFeedback";
import CheckInPopupView from "../../../../common/components/CheckInPopupView/CheckInPopupView";

const CheckInButton = ({restaurant, updateInteractions}) => {

    const navigate = useNavigate();

    const userId = useSelector(selectUserId);
    const friends = useSelector(selectFriends);

    const [checkedIn, setCheckedIn] = useState(false);
    const [checkInPopupIsVisible, setCheckInPopupIsVisible] = useState(false);
    const [checkInFeedback, setCheckInFeedback] = useState("");
    const [feedbackIsVisible, setFeedbackIsVisible] = useState(false);

    const getLastCheckInDate = async () => {
        const lastCheckIn = await getLastCheckInToRestaurantByUserId(userId, restaurant.id);

        return lastCheckIn ? new Date(lastCheckIn.date).toLocaleDateString() : null;
    };

    const updateCheckedIn = () => {
        const today = new Date().toLocaleDateString();

        getLastCheckInDate()
            .then(date => {
                if (date) {
                    setCheckedIn(today === date);
                } else {
                    setCheckedIn(false);
                }
            });
    };

    useEffect(() => {
        if (!restaurant || !userId) return;

        updateCheckedIn();
    }, [restaurant, userId]);

    const handleClick = () => {
        if (!userId) {
            navigate("/sign-in");
        } else if (!feedbackIsVisible) {
            setCheckInPopupIsVisible(true);
        }
    };

    const confirmCheckIn = async (date, friends) => {
        if (+new Date() < +new Date(date)) {
            setCheckInFeedback("You can only check in today or earlier!");
            return;
        }

        const checkedInOnDate = await checkInExists(userId, date, restaurant.id);

        if (checkedInOnDate) {
            setCheckInFeedback("You already checked in on this date!");
            return;
        }

        await addRestaurantCheckIn(userId, date, restaurant, friends);
        updateCheckedIn();

        updateInteractions("checkIns", 1);

        setFeedbackIsVisible(true);

        setTimeout(() => setFeedbackIsVisible(false), 2000);

        closeCheckInPopup();
    };

    const closeCheckInPopup = () => {
        setCheckInPopupIsVisible(false);
    };

    return (
        <>
            <button className="check-in-button" onClick={handleClick}>
                {checkedIn ? "Checked in" : "Check in"}
                <FontAwesomeIcon icon={checkedIn ? faSolidCircleCheck : faCircleCheck} className="icon"/>
            </button>

            {checkInPopupIsVisible && (
                <CheckInPopupView
                    restaurant={restaurant}
                    feedback={checkInFeedback}
                    confirmCheckIn={confirmCheckIn}
                    friends={friends}
                    closePopup={closeCheckInPopup}
                    resetFeedback={() => setCheckInFeedback("")}
                />
            )}

            <InteractionFeedback isVisible={feedbackIsVisible} change="Saved" interaction="check-in"/>
        </>
    );
};

export default CheckInButton;