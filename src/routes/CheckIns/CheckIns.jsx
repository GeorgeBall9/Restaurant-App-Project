import "./CheckIns.css";
import "./CheckInsCalendar.css";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { selectAllRestaurants } from '../../features/restaurants/restaurantsSlice';

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


    useEffect(() => {
        if (!userId) {
            navigate("/profile");
        }
    }, [userId]);


    /* function to be completed for finding dates of check-ins
    const findCheckInForDate = (date) => {
        return checkIns.find((checkIn) => {
            const checkInDate = new Date(checkIn.date);
            return (
                checkInDate.getDate() === date.getDate() &&
                checkInDate.getMonth() === date.getMonth() &&
                checkInDate.getFullYear() === date.getFullYear()
            );
        });
    };
    */

    const handleCalendarChange = (value) => {
        setCalendarValue(value);
        // Fetch and display the check-ins for the selected date
    };

    const handleBackClick = () => {
        navigate("/profile");
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
                    </div>

                    <div className="check-ins-total">
                    <FontAwesomeIcon className="icon" icon={faCircleCheck} />
                    </div>
                </div>

                <div className="check-ins-calendar">
                    <div className="check-ins-calendar-month">

                    </div>

                    <div className="check-ins-calendar-dates">
                        <Calendar
                            onChange={handleCalendarChange}
                            value={calendarValue}
                            maxDate={currentDate}
                            tileContent={({ date, view }) => {
                                // Return the restaurant photo if the user has a check-in for that date
                                // const checkIn = findCheckInForDate(date);
                                // return checkIn ? (
                                //     <img src={`url(${photoUrl})`} alt={name} />
                                // ) : null;
                            }}
                        />

                    </div>
                </div>
            </div>

        </div>
    );
};

export default CheckIns;