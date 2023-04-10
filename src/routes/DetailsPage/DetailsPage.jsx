import Reviews, {reviews} from "./Reviews/Reviews";
import ReviewForm from "./ReviewForm/ReviewForm";

import './DetailsPage.css';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {selectAllRestaurants} from '../../features/restaurants/restaurantsSlice';
import StarRating from '../../common/components/RestaurantCard/StarRating/StarRating';
import {useState, useEffect} from 'react';

import {
    faLocationDot,
    faPhone,
    faUtensils,
    faMoneyBillWave,
    faLeaf,
    faArrowUpRightFromSquare,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import CheckInButton from "./Banner/CheckInButton/CheckInButton";
import CheckInConfirmationPopup
    from "../../features/checkInConfirmation/CheckInConfirmationPopup/CheckInConfirmationPopup";
import {
    selectCheckedIn,
    selectCheckInConfirmationIsVisible
} from "../../features/checkInConfirmation/checkInConfirmationSlice";
import Banner from "./Banner/Banner";
import AdditionalDetail from "./AdditionalDetail/AdditionalDetail";
import {hideSpinner, showSpinner} from "../../features/spinner/spinnerSlice";

const DetailsPage = () => {

    const {id} = useParams();

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const allRestaurants = useSelector(selectAllRestaurants);
    const popupIsVisible = useSelector(selectCheckInConfirmationIsVisible);
    const checkedIn = useSelector(selectCheckedIn);

    const [restaurant, setRestaurant] = useState(null);
    const [isExpanded, setIsExpanded] = useState(false);
    const [toggleLabel, setToggleLabel] = useState('Read More');
    const [scrollPosition, setScrollPosition] = useState(0);
    const [isReviewFormVisible, setIsReviewFormVisible] = useState(false);

    useEffect(() => {
        if (!restaurant) {
            dispatch(showSpinner());
        } else {
            dispatch(hideSpinner());
        }
    }, [restaurant]);

    useEffect(() => {
        if (!allRestaurants) return;

        const foundRestaurant = allRestaurants.find(restaurant => restaurant.id === id);
        setRestaurant(foundRestaurant);
    }, [allRestaurants, id]);

    useEffect(() => {
        if (restaurant === undefined) {
            navigate('/error', {replace: true});
        }
    }, [restaurant, navigate]);

    useEffect(() => {
        const handleScroll = () => {
            setScrollPosition(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    if (!restaurant) {
        return <></>;
    }

    const {
        name,
        photoUrl,
        rating,
        hours,
        website,
        description,
        phone,
        price,
        priceLevel,
        primaryCuisine,
        dietaryRestrictions,
        address
    } = restaurant;

    const {street1, city, postalcode: postalCode} = address;

    const starRating = Math.round(rating * 2) / 2;

    const groupDaysWithSameHours = (hours) => {
        const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        let groupedHours = [];
        let currentGroup = [daysOfWeek[0]];
        let currentHours = hours[0];

        for (let i = 1; i < hours.length; i++) {
            if (hours[i] === currentHours) {
                currentGroup.push(daysOfWeek[i]);
            } else {
                groupedHours.push({
                    days: currentGroup,
                    hours: currentHours,
                });

                currentGroup = [daysOfWeek[i]];
                currentHours = hours[i];
            }
        }

        groupedHours.push({
            days: currentGroup,
            hours: currentHours,
        });

        return groupedHours.map(
            (group) => `${group.days[0]}${group.days.length > 1
                ?
                `-${group.days[group.days.length - 1]}`
                :
                ""}: ${group.hours}`
        );
    };

    const getDomainName = (url) => {
        try {
            const {hostname} = new URL(url);
            return hostname;
        } catch (error) {
            console.error('Error parsing URL', error);
            return url;
        }
    };

    const today = new Date().getDay();
    const displayedHours = groupDaysWithSameHours(hours);
    const isOpen = hours[today] !== "Closed";

    const handleToggleDescription = () => {
        setIsExpanded(!isExpanded);
        setToggleLabel(isExpanded ? 'Read More' : 'Read Less');
    };

    const formattedAddress = `${street1}${city ? `, ${city}` : ""}${postalCode ? `, ${postalCode}` : ""}`;

    return (
        <div className="details-page container">
            {popupIsVisible && <CheckInConfirmationPopup id={id} name={name} checkedIn={checkedIn}/>}

            <Banner id={id} scrollPosition={scrollPosition}/>

            <div className="image-and-info-container">
                <div className="backdrop" style={{backgroundImage: `url(${photoUrl})`}}></div>

                <div className="restaurant-info">
                    <div className="title-container">
                        <h1>{name}</h1>

                        <CheckInButton id={id}/>
                    </div>

                    <StarRating rating={starRating}/>

                    <div className="price">
                        <p>{priceLevel !== null ? priceLevel : price}</p>
                    </div>

                    <div className="address info">
                        <FontAwesomeIcon icon={faLocationDot} className="icon"/>
                        <p>{formattedAddress}</p>
                    </div>

                    {phone && (
                        <div className="phone info">
                            <FontAwesomeIcon icon={faPhone} className="icon"/>
                            <p>{phone}</p>
                        </div>
                    )}

                    <div className="open-status">{isOpen ? 'Open Now' : 'Closed'}</div>
                </div>
            </div>

            <div className="details-container">
                {website && (
                    <div className="website">
                        <h2>Website</h2>
                        <Link to={website}>
                            {getDomainName(website)}
                            <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="icon"/>
                        </Link>
                    </div>
                )}

                {description && (
                    <div className="description">
                        <h2>About</h2>

                        <p>
                            {isExpanded
                                ?
                                description
                                :
                                description.slice(0, 200) + (description.length > 100 ? '...' : '')
                            }
                        </p>

                        {description.length > 200 && (
                            <button
                                className="read-more-button"
                                onClick={handleToggleDescription}
                            >
                                {toggleLabel}
                            </button>
                        )}
                    </div>
                )}

                <div className="pictures">
                    <h2>Photos</h2>
                    <p>No photos available.</p>
                </div>

                <div className="hours">
                    <h2>Opening Times</h2>

                    {displayedHours.map((hour, index) => (
                        <p key={index}>{hour}</p>
                    ))}
                </div>

                <div className="more-details">
                    <h2>More Details</h2>

                    <div>
                        <AdditionalDetail
                            icon={faLocationDot}
                            name="Location"
                            content={formattedAddress}
                        />

                        <AdditionalDetail
                            icon={faMoneyBillWave}
                            name="Price"
                            content={price || priceLevel || 'N/A'
                            }/>

                        <AdditionalDetail
                            icon={faUtensils}
                            name="Cuisine"
                            content={primaryCuisine || 'N/A'}
                        />

                        {dietaryRestrictions && (
                            <AdditionalDetail
                                icon={faLeaf}
                                name="Dietary Restrictions"
                                content={dietaryRestrictions.join(', ')}
                            />
                        )}
                    </div>
                </div>

                <div className="restaurant-reviews">
                    <h2>Reviews</h2>
                    <Reviews reviews={reviews}/>
                    <button
                        className="write-review-button"
                        onClick={() => setIsReviewFormVisible(!isReviewFormVisible)}
                    >
                        {isReviewFormVisible ? "Close Review Form" : "Write a Review"}
                    </button>
                    {isReviewFormVisible && (
                        <ReviewForm restaurantName={name} location={formattedAddress}/>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DetailsPage;