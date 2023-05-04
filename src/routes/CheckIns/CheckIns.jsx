import "./CheckIns.css";
import "./CheckInsCalendar/CheckInsCalendar.css";

import Calendar from "react-calendar";
import CheckInsCollage from "./CheckInsCollage/CheckInsCollage.jsx";
import CheckInsDetails from "./CheckInsDetails/CheckInsDetails";

import NoResults from "../../common/components/NoResults/NoResults";

import { useDispatch, useSelector } from "react-redux";
import { selectUserId } from "../../features/user/userSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faFire, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCheckInsAndRestaurantDataByUserId } from "../../firebase/firebase";
import CheckInsMap from "./CheckInsMap/CheckInsMap";
import { displayRestaurant } from "../../features/map/mapSlice";
import ProfileNavigationView from "../../common/components/ProfileNavigationView/ProfileNavigationView";

const currentDate = new Date();

const CheckIns = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const userId = useSelector(selectUserId);

    const [allCheckIns, setAllCheckIns] = useState([]);
    const [selectedCheckIn, setSelectedCheckIn] = useState(null);
    const [calendarValue, setCalendarValue] = useState(new Date());
    const [showCollagePopup, setShowCollagePopup] = useState(false);
    const [showDetailsPopup, setShowDetailsPopup] = useState(false);

    useEffect(() => {
        if (!allCheckIns?.length) return;

        const lastCheckIn = allCheckIns[allCheckIns.length - 1];
        const lastCheckInDate = new Date(lastCheckIn.date).toLocaleDateString();
        const dateNow = new Date().toLocaleDateString();

        if (lastCheckInDate === dateNow) {
            setSelectedCheckIn(lastCheckIn);
        }
    }, [allCheckIns]);

    const getCheckedInRestaurant = (restaurantId) => {
        return allCheckIns.find(checkIn => checkIn.restaurant.id === restaurantId);
    };

    const handleCollagePopupClose = () => {
        setShowCollagePopup(false);
    };

    const handleDetailsPopupOpen = () => {
        setShowDetailsPopup(true);
    };

    useEffect(() => {
        if (!userId) {
            navigate("/profile");
        }
    }, [userId]);

    useEffect(() => {
        if (!userId) return;

        getCheckInsAndRestaurantDataByUserId(userId)
            .then(data => setAllCheckIns(data));
    }, [userId]);

    useEffect(() => {
        if (!selectedCheckIn) return;

        dispatch(displayRestaurant({ ...selectedCheckIn.restaurant, checkInId: selectedCheckIn.id }));
    }, [selectedCheckIn]);

    const handleCalendarChange = (value) => {
        setCalendarValue(value);
        // Fetch and display the check-ins for the selected date
    };

    const handleTileClick = (checkIn) => {
        setSelectedCheckIn(checkIn);
        setShowCollagePopup(true);
    };

    const handleBackToCalendar = () => {
        setShowCollagePopup(false);
    };

    const TileContent = ({ date }) => {
        if (!allCheckIns || allCheckIns.length === 0) {
            return null;
        }
        const checkInsForDate = allCheckIns.filter((checkIn) => {
            const checkInDate = new Date(checkIn.date).toLocaleDateString();
            return checkInDate === date.toLocaleDateString();
        });

        return checkInsForDate.map((checkIn, index) => {
            const foundCheckIn = getCheckedInRestaurant(checkIn.restaurant.id);

            if (!foundCheckIn) {
                return null;
            }

            const { restaurant } = foundCheckIn;

            const tileContentStyle = {
                backgroundImage: `url(${restaurant.photoUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                width: '100%',
                height: '100%',
            };

            return (
                <div
                    key={index}
                    style={tileContentStyle}
                    title={restaurant.name}
                    onClick={() => handleTileClick(foundCheckIn)}
                ></div>
            );
        });
    };

    const renderTileContent = ({ date, view }) => {
        if (view !== "month") {
            return null;
        }

        return <TileContent date={date} />;
    };

    return (
        <div className="check-ins-page-container">
            <ProfileNavigationView pageTitle="Check-ins" />

            <div className="check-ins-page">
                <div className="check-ins-map-container">
                    {allCheckIns?.length > 0 ? (
                        <CheckInsMap checkIns={allCheckIns} onViewDetails={handleDetailsPopupOpen} />
                    ) : (
                        <NoResults
                            mainText="You haven't checked in anywhere yet."
                            subText="Head to a restaurant page to check-in!"
                        />
                    )}
                </div>

                <div className="check-ins-stats">
                    <div className="check-ins-streak">
                        <FontAwesomeIcon className="icon" icon={faFire} />
                        <span>0</span>
                        <p>Week streak</p>
                    </div>

                    <div className="check-ins-total">
                        <FontAwesomeIcon className="icon" icon={faCircleCheck} />
                        <span>{allCheckIns?.length || "0"}</span>
                        <p>Check-ins</p>
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
                        tileContent={renderTileContent}
                    />

                    {showCollagePopup && (
                        <CheckInsCollage checkIn={selectedCheckIn} onClose={handleCollagePopupClose} />
                    )}

                    {showDetailsPopup && (
                        <CheckInsDetails checkIn={selectedCheckIn} onClose={() => setShowDetailsPopup(false)} />
                    )}
                </div>
            </div>

        </div>
    );
};

export default CheckIns;