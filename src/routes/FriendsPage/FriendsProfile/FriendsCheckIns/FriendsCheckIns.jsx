import "../../../CheckIns/CheckIns.css";
import "../../../CheckIns/CheckInsCalendar/CheckInsCalendar.css";

import Calendar from "react-calendar";
import CheckInsCollage from "../../../CheckIns/CheckInsCollage/CheckInsCollage";

import {getCheckInsAndRestaurantDataByUserId} from "../../../../firebase/firebase";
import {getUserFromUserId} from '../../../../firebase/firebase';
import {useDispatch, useSelector} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFire, faCircleCheck} from "@fortawesome/free-solid-svg-icons";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import CheckInsMap from "../../../CheckIns/CheckInsMap/CheckInsMap";
import {displayRestaurant} from "../../../../features/map/mapSlice";
import ProfileNavigation from "../../../../common/components/ProfileNavigation/ProfileNavigation";
import {selectDisplayedFriend} from "../../../../features/user/userSlice";

const currentDate = new Date();

const FriendsCheckIns = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const displayedFriend = useSelector(selectDisplayedFriend);

    const [selectedCheckIn, setSelectedCheckIn] = useState(null);
    const [calendarValue, setCalendarValue] = useState(new Date());
    const [showCollagePopup, setShowCollagePopup] = useState(false);
    const [friendCheckedInRestaurants, setFriendCheckedInRestaurants] = useState([]);

    useEffect(() => {
        if (!displayedFriend) return;

        getCheckInsAndRestaurantDataByUserId(displayedFriend.id)
            .then(data => setFriendCheckedInRestaurants(data));
    }, [displayedFriend]);

    const getFriendCheckedInRestaurant = (id) => {
        return friendCheckedInRestaurants.find(checkIn => checkIn.restaurantId === id);
    };

    const handleCollagePopupClose = () => {
        setShowCollagePopup(false);
    };

    useEffect(() => {
        if (!displayedFriend) {
            navigate("/profile");
        }
    }, [displayedFriend]);

    useEffect(() => {
        if (!selectedCheckIn) return;

        dispatch(displayRestaurant(selectedCheckIn.restaurant));
    }, [selectedCheckIn]);

    const handleCalendarChange = (value) => {
        setCalendarValue(value);
        // Fetch and display the check-ins for the selected date
    };

    const handleBackClick = () => {
        navigate(`/view-profile/${displayedFriend.id}`);
    };

    const calculateStreak = (checkIns) => {
        let streak = 0;
        const weekInMillis = 1000 * 60 * 60 * 24 * 7;

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
    const checkInsStreak = calculateStreak(friendCheckedInRestaurants);

    const calculateTotalCheckIns = (checkIns) => {
        return checkIns.length;
    };

    const totalCheckIns = calculateTotalCheckIns(friendCheckedInRestaurants);

    const handleTileClick = (checkIn) => {
        setSelectedCheckIn(checkIn);
        setShowCollagePopup(true);
    };

    const handleBackToCalendar = () => {
        setShowCollagePopup(false);
    };

    const TileContent = ({date}) => {
        const checkInsForDate = friendCheckedInRestaurants.filter((checkIn) => {
            const checkInDate = new Date(checkIn.date).toLocaleDateString();
            return checkInDate === date.toLocaleDateString();
        });

        return checkInsForDate.map((checkIn, index) => {
            const foundCheckIn = getFriendCheckedInRestaurant(checkIn.restaurant.id);

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
            {displayedFriend && (
                <>
                    <ProfileNavigation pageTitle={`${displayedFriend.displayName}'s Check-ins`}/>

                    <div className="check-ins-page">
                        <div className="check-ins-map-container">
                            {friendCheckedInRestaurants && <CheckInsMap checkIns={friendCheckedInRestaurants}/>}
                        </div>

                        <div className="check-ins-stats">
                            <div className="check-ins-streak">
                                <FontAwesomeIcon className="icon" icon={faFire}/>
                                <span>{checkInsStreak}</span>
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

                </>
            )}
        </div>
    );
};

export default FriendsCheckIns;