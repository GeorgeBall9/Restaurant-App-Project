import "./CheckIns.css";
import "./CheckInsCalendar/CheckInsCalendar.css";

import Calendar from "react-calendar";

import NoResults from "../../common/components/NoResults/NoResults";

import {useDispatch, useSelector} from "react-redux";
import {selectProfilePhotoUrl, selectUserId} from "../../features/user/userSlice";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUtensils, faCircleCheck} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {getCheckInsAndRestaurantDataByUserId} from "../../firebase/firebase";
import {displayRestaurant} from "../../features/map/mapSlice";
import ProfileNavigationView from "../../common/components/ProfileNavigationView/ProfileNavigationView";
import DetailsPopup from "./DetailsPopup/DetailsPopup";
import MapView from "../../common/components/MapView/MapView";
import CheckInsCollage from "./CheckInsCollage/CheckInsCollage";

const currentDate = new Date();

const CheckIns = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const userId = useSelector(selectUserId);
    const profilePhotoUrl = useSelector(selectProfilePhotoUrl);

    const [allCheckIns, setAllCheckIns] = useState([]);
    const [selectedCheckIn, setSelectedCheckIn] = useState(null);
    const [calendarValue, setCalendarValue] = useState(new Date());
    const [showCollagePopup, setShowCollagePopup] = useState(false);
    const [fetchStatus, setFetchStatus] = useState("pending");
    const [detailsPopupIsVisible, setDetailsPopupIsVisible] = useState(false);
    const [checkInsOnDate, setCheckInsOnDate] = useState(null);

    useEffect(() => {
        if (!userId) {
            navigate("/profile");
        }
    }, [userId]);

    useEffect(() => {
        if (!userId) return;

        getCheckInsAndRestaurantDataByUserId(userId)
            .then(data => {
                setAllCheckIns(data);
                setFetchStatus("idle");
            });
    }, [userId]);

    useEffect(() => {
        if (!checkInsOnDate) return;

        const checkIn = checkInsOnDate[0];

        dispatch(displayRestaurant({...checkIn.restaurant, checkInId: checkIn.id}));
    }, [checkInsOnDate]);

    useEffect(() => {
        if (!allCheckIns?.length) return;

        const checkIns = getCheckInsOnDate(new Date());
        setCheckInsOnDate(checkIns);
    }, [allCheckIns]);

    const getCheckInsOnDate = (date) => {
        return allCheckIns.filter((checkIn) => {
            const checkInDate = new Date(checkIn.date).toLocaleDateString();
            return checkInDate === date.toLocaleDateString();
        });
    };

    const getCheckedInRestaurant = (restaurantId) => {
        return allCheckIns.find(checkIn => checkIn.restaurant.id === restaurantId);
    };

    const countUniqueRestaurants = (checkIns) => {
        const uniqueRestaurantIds = new Set(checkIns.map((checkIn) => checkIn.restaurant.id));
        return uniqueRestaurantIds.size;
    };

    const handleCalendarChange = (value) => {
        setCalendarValue(value);
        // Fetch and display the check-ins for the selected date
    };

    const handleTileClick = (checkIns) => {
        setCheckInsOnDate(checkIns.map(checkIn => {
            const updatedCheckIn = {...checkIn};
            updatedCheckIn.userData = {id: userId, profilePhotoUrl};
            return updatedCheckIn;
        }));

        setDetailsPopupIsVisible(true);
    };

    const TileContent = ({date}) => {
        if (!allCheckIns?.length) return null;

        const checkInsForDate = getCheckInsOnDate(date);

        return checkInsForDate.map((checkIn, index) => {
            const foundCheckIn = getCheckedInRestaurant(checkIn.restaurant.id);

            if (!foundCheckIn) return null;

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
                    onClick={() => handleTileClick(checkInsForDate)}
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
            <ProfileNavigationView pageTitle="Check-ins"/>

            <div className="check-ins-page">
                <div className="check-ins-map-container">
                    {allCheckIns?.length > 0 && (
                        <MapView height={260} zoom={14} checkIns={allCheckIns}/>
                    )}

                    {!allCheckIns?.length && fetchStatus === "idle" && (
                        <NoResults
                            mainText="You haven't checked in anywhere yet."
                            subText="Head to a restaurant page to check-in!"
                        />
                    )}
                </div>

                <div className="check-ins-stats">
                    <div className="check-ins-unique-restaurants">
                        <FontAwesomeIcon className="icon" icon={faUtensils}/>
                        <span>{countUniqueRestaurants(allCheckIns) || "0"}</span>
                        <p>Unique Restaurants</p>
                    </div>

                    <div className="check-ins-total">
                        <FontAwesomeIcon className="icon" icon={faCircleCheck}/>
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
                        <CheckInsCollage checkIn={selectedCheckIn} onClose={() => setShowCollagePopup(false)}/>
                    )}

                    {detailsPopupIsVisible && (
                        <DetailsPopup
                            checkIns={checkInsOnDate}
                            date={calendarValue.toLocaleDateString()}
                            closePopup={() => setDetailsPopupIsVisible(false)}
                            showPhotos={() => setShowCollagePopup(true)}
                            setSelectedCheckIn={setSelectedCheckIn}
                        />
                    )}
                </div>
            </div>

        </div>
    );
};

export default CheckIns;