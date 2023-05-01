import "./CheckIns.css";
import "./CheckInsCalendar/CheckInsCalendar.css";

import Calendar from "react-calendar";
import CheckInsCollage from "./CheckInsCollage/CheckInsCollage.jsx";

import {useDispatch, useSelector} from "react-redux";
import {selectUserId} from "../../features/user/userSlice";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faFire, faCircleCheck} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {getCheckInsAndRestaurantDataByUserId} from "../../firebase/firebase";
import CheckInsMap from "./CheckInsMap/CheckInsMap";
import {displayRestaurant} from "../../features/map/mapSlice";
import ProfileNavigation from "../../common/components/ProfileNavigation/ProfileNavigation";

const currentDate = new Date();

const CheckIns = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const userId = useSelector(selectUserId);

    const [allCheckIns, setAllCheckIns] = useState([]);
    const [selectedCheckIn, setSelectedCheckIn] = useState(null);
    const [calendarValue, setCalendarValue] = useState(new Date());
    const [showCollagePopup, setShowCollagePopup] = useState(false);

    useEffect(() => {
        if (!allCheckIns?.length) return;


    }, [allCheckIns]);

    const getCheckedInRestaurant = (restaurantId) => {
        return allCheckIns.find(checkIn => checkIn.restaurant.id === restaurantId);
    };

    const handleCollagePopupClose = () => {
        setShowCollagePopup(false);
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

        dispatch(displayRestaurant({...selectedCheckIn.restaurant, checkInId: selectedCheckIn.id}));
    }, [selectedCheckIn]);

    const handleCalendarChange = (value) => {
        setCalendarValue(value);
        // Fetch and display the check-ins for the selected date
    };

    const totalCheckIns = allCheckIns.length;

    const handleTileClick = (checkIn) => {
        setSelectedCheckIn(checkIn);
        setShowCollagePopup(true);
    };

    const handleBackToCalendar = () => {
        setShowCollagePopup(false);
    };

    const TileContent = ({date}) => {
        const checkInsForDate = allCheckIns.filter((checkIn) => {
            const checkInDate = new Date(checkIn.date).toLocaleDateString();
            return checkInDate === date.toLocaleDateString();
        });

        return checkInsForDate.map((checkIn, index) => {
            const foundCheckIn = getCheckedInRestaurant(checkIn.restaurant.id);

            if (!foundCheckIn) {
                return null;
            }

            const {restaurant} = foundCheckIn;

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

    const renderTileContent = ({date, view}) => {
        if (view !== "month") {
            return null;
        }

        return <TileContent date={date}/>;
    };

    return (
        <div className="check-ins-page-container">
            <ProfileNavigation pageTitle="Check-ins"/>

            <div className="check-ins-page">
                <div className="check-ins-map-container">
                    {allCheckIns && <CheckInsMap checkIns={allCheckIns} selectedCheckIn={selectedCheckIn}/>}
                </div>

                <div className="check-ins-stats">
                    <div className="check-ins-streak">
                        <FontAwesomeIcon className="icon" icon={faFire}/>
                        <span>0</span>
                        <p>Week streak</p>
                    </div>

                    <div className="check-ins-total">
                        <FontAwesomeIcon className="icon" icon={faCircleCheck}/>
                        <span>{totalCheckIns}</span>
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
                        <CheckInsCollage checkIn={selectedCheckIn} onClose={handleCollagePopupClose}/>
                    )}
                </div>
            </div>

        </div>
    );
};

export default CheckIns;