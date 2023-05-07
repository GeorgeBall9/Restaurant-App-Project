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
import {getCheckInsAndRestaurantDataByUserIdForMonth} from "../../firebase/firebase";
import ProfileNavigationView from "../../common/components/ProfileNavigationView/ProfileNavigationView";
import DetailsPopup from "./DetailsPopup/DetailsPopup";
import MapView from "../../common/components/MapView/MapView";
import CheckInsCollage from "./CheckInsCollage/CheckInsCollage";
import {
    selectCheckIns,
    selectSelectedCheckIns,
    setCheckIns, setSelectedCheckIns
} from "../../features/checkIns/checkInsSlice";
import {displayRestaurant} from "../../features/map/mapSlice";

const currentDate = new Date();

const CheckIns = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const userId = useSelector(selectUserId);
    const profilePhotoUrl = useSelector(selectProfilePhotoUrl);
    const allCheckIns = useSelector(selectCheckIns);
    const selectedCheckIns = useSelector(selectSelectedCheckIns);

    const [calendarValue, setCalendarValue] = useState(new Date());
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const [showCollagePopup, setShowCollagePopup] = useState(false);
    const [fetchStatus, setFetchStatus] = useState("pending");
    const [detailsPopupIsVisible, setDetailsPopupIsVisible] = useState(false);

    useEffect(() => {
        if (!userId) {
            navigate("/profile");
        }
    }, [userId]);

    useEffect(() => {
        if (!userId) return;

        getCheckInsAndRestaurantDataByUserIdForMonth(userId, selectedMonth)
            .then(data => {
                dispatch(setCheckIns(data));
                setFetchStatus("idle");
            });
    }, [userId, selectedMonth]);

    useEffect(() => {
        if (!selectedCheckIns?.length) return;

        const checkIn = selectedCheckIns[0];

        setCalendarValue(new Date(checkIn.date));
    }, [selectedCheckIns]);

    useEffect(() => {
        if (!allCheckIns?.length) return;

        const checkIns = getCheckInsOnDate(calendarValue);
        dispatch(setSelectedCheckIns(checkIns));
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

    const handleTileClick = (checkIns) => {
        const checkInsOnDate = checkIns.map(checkIn => {
            const updatedCheckIn = {...checkIn};
            updatedCheckIn.userData = {id: userId, profilePhotoUrl};
            return updatedCheckIn;
        });

        dispatch(setSelectedCheckIns(checkInsOnDate));

        const checkIn = checkInsOnDate[0];
        dispatch(displayRestaurant({...checkIn.restaurant, checkInId: checkIn.id}));

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

    const handleStartDateChange = ({activeStartDate}) => {
        setSelectedMonth(activeStartDate.getMonth());
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
                            mainText="You haven't checked in anywhere this month."
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
                        onChange={(value) => setCalendarValue(value)}
                        value={calendarValue}
                        maxDate={currentDate}
                        minDate={new Date(2023, 0, 1)}
                        maxDetail="month"
                        minDetail="month"
                        tileContent={renderTileContent}
                        onActiveStartDateChange={handleStartDateChange}
                    />

                    {showCollagePopup && (
                        <CheckInsCollage closePopup={() => setShowCollagePopup(false)}/>
                    )}

                    {detailsPopupIsVisible && (
                        <DetailsPopup
                            date={calendarValue.toLocaleDateString()}
                            closePopup={() => setDetailsPopupIsVisible(false)}
                            showPhotos={() => setShowCollagePopup(true)}
                        />
                    )}
                </div>
            </div>

        </div>
    );
};

export default CheckIns;