import "../../../CheckIns/CheckIns.css";
import "../../../CheckIns/CheckInsCalendar/CheckInsCalendar.css";

import Calendar from "react-calendar";
import CheckInsCollage from "../../../CheckIns/CheckInsCollage/CheckInsCollage";

import {getCheckInsByUserId} from "../../../../firebase/firebase";
import {getUserFromUserId} from '../../../../firebase/firebase';
import {useDispatch, useSelector} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faFire, faCircleCheck} from "@fortawesome/free-solid-svg-icons";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getRestaurantById} from "../../../../firebase/firebase";
import CheckInsMap from "../../../CheckIns/CheckInsMap/CheckInsMap";
import {displayRestaurant, resetDisplayedRestaurant} from "../../../../features/map/mapSlice";
import ProfileNavigation from "../../../../common/components/ProfileNavigation/ProfileNavigation";

const currentDate = new Date();

const FriendsCheckIns = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const {userId} = useParams();

    const [restaurant, setRestaurant] = useState(null);
    const [calendarValue, setCalendarValue] = useState(new Date());
    const [showCollagePopup, setShowCollagePopup] = useState(false);
    const [friendProfile, setFriendProfile] = useState(null);
    const [friendCheckedInRestaurants, setFriendCheckedInRestaurants] = useState([]);

    useEffect(() => {
        if (!userId) return;

        const fetchFriendProfile = async () => {
            const user = await getUserFromUserId(userId);
            setFriendProfile(user);

            const checkedInData = await getCheckInsByUserId(userId);
            setFriendCheckedInRestaurants(checkedInData);
        };

        fetchFriendProfile();
    }, [userId]);

    const getFriendCheckedInRestaurant = (id) => {
        return friendCheckedInRestaurants.find(restaurant => restaurant.id === id);
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
        if (!restaurant) return;

        dispatch(displayRestaurant(restaurant));
    }, [restaurant]);

    const handleCalendarChange = (value) => {
        setCalendarValue(value);
        // Fetch and display the check-ins for the selected date
    };

    const handleBackClick = () => {
        navigate(`/view-profile/${userId}`);
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

    const handleTileClick = (restaurant) => {
        setRestaurant(restaurant);
        setShowCollagePopup(true);
    };

    const handleBackToCalendar = () => {
        setShowCollagePopup(false);
    };

    const TileContent = ({date}) => {
        const checkInsForDate = friendCheckedInRestaurants.filter((checkIn) => {
            const checkInDate = new Date(checkIn.date);

            return (
                checkInDate.getFullYear() === date.getFullYear() &&
                checkInDate.getMonth() === date.getMonth() &&
                checkInDate.getDate() === date.getDate()
            );
        });

        return checkInsForDate.map((checkIn, index) => {
            const restaurant = getFriendCheckedInRestaurant(checkIn.id);

            if (!restaurant) {
                return null;
            }

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
                    onClick={() => handleTileClick(restaurant)}
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
            {friendProfile && (
                <>
                    <ProfileNavigation pageTitle={`${friendProfile.displayName}'s Check-ins`}/>

                    <div className="check-ins-page">
                        <div className="check-ins-map-container">
                            {friendCheckedInRestaurants && <CheckInsMap restaurants={friendCheckedInRestaurants}/>}
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
                                <CheckInsCollage restaurant={restaurant} onClose={handleCollagePopupClose}/>
                            )}
                        </div>
                    </div>

                </>
            )}
        </div>
    );
};

export default FriendsCheckIns;