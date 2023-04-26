import './DetailsPage.css';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {selectAllRestaurants} from '../../features/restaurants/restaurantsSlice';
import StarRating from '../../common/components/StarRating/StarRating';
import {useState, useEffect, useRef} from 'react';

import {
    faLocationDot,
    faPhone,
    faUtensils,
    faMoneyBillWave,
    faLeaf,
    faArrowUpRightFromSquare, faXmark,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import CheckInButton from "./CheckInButton/CheckInButton";
import CheckInConfirmationPopup
    from "../../features/checkInConfirmation/CheckInConfirmationPopup/CheckInConfirmationPopup";
import {
    selectAddedCheckIn,
    selectCheckedIn,
    selectCheckInConfirmationIsVisible, selectCheckInFeedbackIsVisible
} from "../../features/checkInConfirmation/checkInConfirmationSlice";
import Banner from "./Banner/Banner";
import AdditionalDetail from "./AdditionalDetail/AdditionalDetail";
import {hideSpinner, showSpinner} from "../../features/spinner/spinnerSlice";
import {selectUserId} from "../../features/user/userSlice";
import {checkIsOpen} from "../Bookmarks/Bookmarks";
import {getRestaurantById} from "../../firebase/firebase";
import ReviewsSection from "./ReviewsSection/ReviewsSection";
import DetailsNavLink from "./DetailsNavLink/DetailsNavLink";
import {faBookmark, faHeart, faCheckCircle, faCircleCheck} from "@fortawesome/free-regular-svg-icons";

const navLinksText = ["Interactions", "Website", "About", "Photos", "Hours", "Details", "Reviews"];

const DetailsPage = () => {

    const {id} = useParams();

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const userId = useSelector(selectUserId);
    const allRestaurants = useSelector(selectAllRestaurants);
    const popupIsVisible = useSelector(selectCheckInConfirmationIsVisible);
    const checkedIn = useSelector(selectCheckedIn);
    const checkInFeedbackIsVisible = useSelector(selectCheckInFeedbackIsVisible);
    const addedCheckIn = useSelector(selectAddedCheckIn);

    const nameRef = useRef(null);
    const interactionsRef = useRef(null);
    const websiteRef = useRef(null);
    const aboutRef = useRef(null);
    const photosRef = useRef(null);
    const hoursRef = useRef(null);
    const detailsRef = useRef(null);
    const reviewsRef = useRef(null);

    const [restaurant, setRestaurant] = useState(null);
    const [isExpanded, setIsExpanded] = useState(false);
    const [toggleLabel, setToggleLabel] = useState('Read More');
    const [scrollPosition, setScrollPosition] = useState(0);
    const [activeNavLink, setActiveNavLink] = useState("Interactions");
    const [navigationStyle, setNavigationStyle] = useState({top: 0});
    const [interactions, setInteractions] = useState(null);
    const [showNameInBanner, setShowNameInBanner] = useState(false);

    useEffect(() => {
        console.log({checkInFeedbackIsVisible, addedCheckIn})
    }, [checkInFeedbackIsVisible, addedCheckIn]);

    useEffect(() => {
        if (!restaurant) {
            dispatch(showSpinner());
        } else {
            dispatch(hideSpinner());
        }
    }, [restaurant]);

    useEffect(() => {
        if (!allRestaurants) return;

        let foundRestaurant = allRestaurants.find(restaurant => restaurant.id === id);

        if (!foundRestaurant) {
            getRestaurantById(id)
                .then(data => setRestaurant(data));
        } else {
            setRestaurant(foundRestaurant);
        }
    }, [allRestaurants, id]);

    useEffect(() => {
        if (restaurant === undefined) {
            navigate('/error', {replace: true});
        }
    }, [restaurant, navigate]);

    useEffect(() => {
        if (!restaurant) return;

        getRestaurantById(restaurant.id)
            .then(data => {
                if (!data) return;
                const {bookmarks, checkIns, recommendations} = data;
                const foundInteractions = {bookmarks, checkIns, recommendations};
                setInteractions(foundInteractions);
            });
    }, [restaurant]);

    useEffect(() => {
        const handleScroll = () => {
            const {scrollY} = window;
            setScrollPosition(scrollY);

            let previousTop = 0;

            const bannerHeight = document.getElementById("banner").getBoundingClientRect().height;
            const navHeight = document.getElementById("details-page-nav").getBoundingClientRect().height;
            const adjustment = bannerHeight + navHeight;

            const activeSection = [interactionsRef, websiteRef, aboutRef, photosRef, hoursRef, detailsRef, reviewsRef]
                .find(({current}) => {
                    const sectionBottom = current.offsetTop - adjustment + current.offsetHeight;
                    const sectionIsActive = scrollY > previousTop && scrollY <= sectionBottom;

                    if (sectionIsActive) {
                        return true;
                    } else {
                        previousTop = sectionBottom;
                        return false;
                    }
                })
                ?.current;

            if (activeSection) {
                setActiveNavLink(activeSection.id);
            }

            if (nameRef.current.getBoundingClientRect().bottom - bannerHeight <= 0) {
                setShowNameInBanner(true);
            } else {
                setShowNameInBanner(false);
            }
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

    const displayedHours = groupDaysWithSameHours(hours);
    const isOpen = checkIsOpen(restaurant);

    const handleToggleDescription = () => {
        setIsExpanded(!isExpanded);
        setToggleLabel(isExpanded ? 'Read More' : 'Read Less');
    };

    const formattedAddress = `${street1}${city ? `, ${city}` : ""}${postalCode ? `, ${postalCode}` : ""}`;

    const handleNavLinkClick = (text) => {
        const elementRef = [interactionsRef, websiteRef, aboutRef, photosRef, hoursRef, detailsRef, reviewsRef]
            .find(({current}) => current.id === text)?.current;

        const elementPosition = elementRef.offsetTop;
        const bannerHeight = document.getElementById("banner").getBoundingClientRect().height;
        const navHeight = document.getElementById("details-page-nav").getBoundingClientRect().height;

        window.scrollTo({
            top: elementPosition - (bannerHeight + navHeight + 5),
            behavior: "smooth"
        });
    };

    const setNavTopPosition = (top) => {
        setNavigationStyle(navigationStyle => {
            const style = {...navigationStyle};
            style.top = top;
            return style;
        });
    };

    return (
        <div className="details-page container">
            {popupIsVisible && <CheckInConfirmationPopup restaurant={restaurant} name={name} checkedIn={checkedIn}/>}

            <div className="bookmark-feedback" style={{opacity: checkInFeedbackIsVisible ? 1 : 0}}>
                {addedCheckIn ? "Saved " : "Removed "} check-in
                <FontAwesomeIcon icon={addedCheckIn ? faCircleCheck : faXmark} className="bookmark-feedback-icon"/>
            </div>

            <Banner
                restaurant={restaurant}
                scrollPosition={scrollPosition}
                setNavTopPosition={setNavTopPosition}
                showName={showNameInBanner}
            />

            <div className="image-and-info-container">
                <div className="backdrop" style={{backgroundImage: `url(${photoUrl})`}}></div>

                <div className="restaurant-info">
                    <div className="title-container">
                        <h1 ref={nameRef}>{name}</h1>

                        <CheckInButton restaurantId={id}/>
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

            <div id="details-page-nav" className="details-page-navigation" style={navigationStyle}>
                {navLinksText.map((text, i) => (
                    <DetailsNavLink
                        key={i}
                        active={activeNavLink === text}
                        handleClick={handleNavLinkClick}
                        text={text}
                    />
                ))}
            </div>

            <div className="details-container">
                <div id="Interactions" ref={interactionsRef} className="interactions">
                    <h2>Interactions</h2>

                    <div>
                        <div className="stat-container">
                            <FontAwesomeIcon icon={faHeart} className="icon"/>
                            {interactions?.recommendations || "0"}
                        </div>

                        <div className="stat-container">
                            <FontAwesomeIcon icon={faBookmark} className="icon"/>
                            {interactions?.bookmarks || "0"}
                        </div>

                        <div className="stat-container">
                            <FontAwesomeIcon icon={faCheckCircle} className="icon"/>
                            {interactions?.checkIns || "0"}
                        </div>
                    </div>
                </div>

                {website && (
                    <div id="Website" ref={websiteRef} className="website">
                        <h2>Website</h2>

                        <Link to={website}>
                            {getDomainName(website)}
                            <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="icon"/>
                        </Link>
                    </div>
                )}


                <div id="About" ref={aboutRef} className="description">
                    <h2>About</h2>

                    <p>
                        {description ? (
                            isExpanded ? (
                                description
                            ) : (
                                description.slice(0, 200) + (description.length > 100 ? '...' : '')
                            )
                        ) : (
                            'No description available.'
                        )}
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


                <div id="Photos" ref={photosRef} className="pictures">
                    <h2>Photos</h2>
                    <p>No photos available.</p>
                </div>

                <div id="Hours" ref={hoursRef} className="hours">
                    <h2>Opening Times</h2>

                    {displayedHours.map((hour, index) => (
                        <p key={index}>{hour}</p>
                    ))}
                </div>

                <div id="Details" ref={detailsRef} className="more-details">
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

                <div id="Reviews" ref={reviewsRef}>
                    <ReviewsSection userId={userId} restaurant={restaurant}/>
                </div>
            </div>
        </div>
    );
};

export default DetailsPage;