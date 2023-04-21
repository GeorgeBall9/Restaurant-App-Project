import "./CheckIns.css";
import "./CheckInsCalendar/CheckInsCalendar.css";

import Calendar from "react-calendar";
import CheckInsCollage from "./CheckInsCollage/CheckInsCollage.jsx";

import { useSelector } from "react-redux";
import { selectUserId } from "../../features/user/userSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faFire, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";


const CheckIns = () => {

    const navigate = useNavigate();

    const userId = useSelector(selectUserId);

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


    // const findCheckInForDate = (date) => {
    //     return checkIns.find((checkIn) => {
    //         const checkInDate = new Date(checkIn.date);
    //         return (
    //             checkInDate.getDate() === date.getDate() &&
    //             checkInDate.getMonth() === date.getMonth() &&
    //             checkInDate.getFullYear() === date.getFullYear()
    //         );
    //     });
    // };

    const handleCalendarChange = (value) => {
        setCalendarValue(value);
        // Fetch and display the check-ins for the selected date
    };

    const handleBackClick = () => {
        navigate("/profile");
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
                        <p>Week streak</p>
                    </div>

                    <div className="check-ins-total">
                        <FontAwesomeIcon className="icon" icon={faCircleCheck} />
                        <p> Check-ins</p>
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
                        tileContent={({ date, view }) => {
                            // Return the restaurant photo if the user has a check-in for that date
                            // const checkIn = findCheckInForDate(date);
                            // return checkIn ? (
                            //     <img src={`url(${photoUrl})`} alt={name} />
                            // ) : null;
                        }}
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