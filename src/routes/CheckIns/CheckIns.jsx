import "./CheckIns.css";
import "./CheckInsCalendar/CheckInsCalendar.css";

import Calendar from "react-calendar";
import CheckInsCollage from "./CheckInsCollage/CheckInsCollage.jsx";

import { useSelector } from "react-redux";
import { selectUserId, selectCheckedInRestaurants } from "../../features/user/userSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faFire, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { selectAllRestaurants } from "../../features/restaurants/restaurantsSlice";
import { getRestaurantById } from "../../firebase/firebase";


const CheckIns = () => {

    const navigate = useNavigate();

    const userId = useSelector(selectUserId);
    const userCheckIns = useSelector(selectCheckedInRestaurants);
    const allRestaurants = useSelector(selectAllRestaurants);

    const [restaurant, setRestaurant] = useState(null);
    const [calendarValue, setCalendarValue] = useState(new Date());
    const [currentDate] = useState(new Date());
    const [showCollagePopup, setShowCollagePopup] = useState(false);

    const handleCollagePopupClose = () => {
        setShowCollagePopup(false);
    };

    useEffect(() => {
        if (!userId) {
            navigate("/profile");
        }
    }, [userId]);


    const handleCalendarChange = (value) => {
        setCalendarValue(value);
        // Fetch and display the check-ins for the selected date
    };

    const handleBackClick = () => {
        navigate("/profile");
    };

    const calculateStreak = (checkIns) => {
        let streak = 0;
        const weekInMillis = 1000 * 60 * 60 * 24 * 7;
        const now = new Date();

        const timestamps = checkIns.map(checkIn => new Date(checkIn.timestamp));
        timestamps.sort((a, b) => b - a);

        for (let i = 0; i < timestamps.length; i++) {
            const currentCheckIn = timestamps[i];
            const nextCheckIn = timestamps[i + 1] || null;

            if (!nextCheckIn || currentCheckIn - nextCheckIn >= weekInMillis) {
                streak++;
            } else {
                break;
            }
        }

        return streak;
    };
    const checkInsStreak = calculateStreak(userCheckIns);

    const calculateTotalCheckIns = (checkIns) => {
        return checkIns.length;
    };

    const totalCheckIns = calculateTotalCheckIns(userCheckIns);

    const getTileContent = (date, checkIns) => {
        // console.log('getTileContent called with date:', date);
        const checkIn = checkIns.find((checkIn) =>
            areSameDay(new Date(checkIn.timestamp), date)
        );

        if (checkIn) {
            // console.log('CheckIn found:', checkIn); // Add this line
            const restaurant = allRestaurants.find((restaurant) => restaurant.id === checkIn.restaurantId);

            // if (!restaurant) {
            //     console.log('Restaurant not found for checkIn:', checkIn); // Add this line
            // }
            if (restaurant) {
                console.log('Restaurant:', restaurant); // Add this line to log the restaurant object
                return (
                    <div
                        style={{
                            backgroundImage: `url(${restaurant.photoUrl})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            width: "100%",
                            height: "100%",
                        }}>
                    </div>
                );
            }
        }

        return null;
    };

    const areSameDay = (date1, date2) => {
        // console.log('Comparing dates:', date1, date2);
        return (
            date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getDate() === date2.getDate()
        );
    };

    const handleTileClick = (restaurant) => {
        setRestaurant(restaurant);
        setShowCollagePopup(true);
    };

    const handleBackToCalendar = () => {
        setShowCollagePopup(false);
    };

    return (
        <div className="check-ins-page-container">
            <header>
                <div className="container">
                    <button onClick={handleBackClick}>
                        <FontAwesomeIcon className="icon" icon={faArrowLeft} />
                        Back
                    </button>

                    <h1>Check-ins</h1>

                    <button style={{ visibility: "hidden" }}>
                        <FontAwesomeIcon className="icon" icon={faArrowLeft} />
                        Back
                    </button>
                </div>
            </header>

            <div className="check-ins-page">
                <div className="check-ins-map">
                    <p> MAP GOES HERE </p> {/*Placeholder*/}
                </div>

                <div className="check-ins-stats">
                    <div className="check-ins-streak">
                        <FontAwesomeIcon className="icon" icon={faFire} />
                        <p>Week streak {checkInsStreak}</p>
                    </div>

                    <div className="check-ins-total">
                        <FontAwesomeIcon className="icon" icon={faCircleCheck} />
                        <p> Check-ins {totalCheckIns}</p>
                    </div>
                </div>

                <div className="check-ins-calendar">
                    <Calendar
                        onChange={handleCalendarChange}
                        value={calendarValue}
                        maxDate={currentDate}
                        minDate={new Date(2023, 0, 1)}
                        maxDetail="month"
                        minDetail="month"
                        tileContent={({ date, view }) => getTileContent(date, userCheckIns)}
                    />

                    {showCollagePopup && (
                        <CheckInsCollage restaurant={restaurant} onClose={handleCollagePopupClose} />
                    )}
                </div>
            </div>

        </div>
    );
};

export default CheckIns;