import './DetailsPage.css';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {selectAllRestaurants} from '../../features/restaurants/restaurantsSlice';
import {useState, useEffect, useRef} from 'react';

import {faArrowUpRightFromSquare, faXmark,} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import CheckInConfirmationPopup
    from "../../features/checkInConfirmation/CheckInConfirmationPopup/CheckInConfirmationPopup";
import {
    selectAddedCheckIn,
    selectCheckedIn,
    selectCheckInConfirmationIsVisible, selectCheckInFeedbackIsVisible
} from "../../features/checkInConfirmation/checkInConfirmationSlice";
import BannerView from "./BannerView/BannerView";
import {hideSpinner, showSpinner} from "../../features/spinner/spinnerSlice";
import {selectUserId} from "../../features/user/userSlice";
import {checkIsOpen} from "../Bookmarks/Bookmarks";
import {getRestaurantById} from "../../firebase/firebase";
import ReviewsSection from "./ReviewsSection/ReviewsSection";
import DetailsNavLink from "./DetailsNavLink/DetailsNavLink";
import {faCircleCheck} from "@fortawesome/free-regular-svg-icons";
import AdditionalDetailsView from "./AdditionalDetailsView/AdditionalDetailsView";
import HoursView from "./HoursView/HoursView";
import ImageAndInfoView from "./ImageAndInfoView/ImageAndInfoView";
import InteractionsView from "./InteractionsView/InteractionsView";
import WebsiteView from "./WebsiteView/WebsiteView";
import AboutView from "./AboutView/AboutView";

const navLinksText = ["Interactions", "Website", "About", "Hours", "Details", "Reviews"];

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

    const bannerRef = useRef(null);
    const nameRef = useRef(null);
    const interactionsRef = useRef(null);
    const websiteRef = useRef(null);
    const aboutRef = useRef(null);
    const hoursRef = useRef(null);
    const detailsRef = useRef(null);
    const reviewsRef = useRef(null);

    const [restaurant, setRestaurant] = useState(null);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [activeNavLink, setActiveNavLink] = useState("Interactions");
    const [navigationStyle, setNavigationStyle] = useState({top: 0});
    const [interactions, setInteractions] = useState(null);
    const [showNameInBanner, setShowNameInBanner] = useState(false);

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
        if (!bannerRef.current) return;

        setNavigationStyle(navigationStyle => {
            const style = {...navigationStyle};
            style.top = bannerRef.current.offsetHeight - 2;
            return style;
        });
    }, [bannerRef.current]);

    useEffect(() => {
        const handleScroll = () => {
            const {scrollY} = window;
            setScrollPosition(scrollY);

            let previousTop = 0;

            const bannerHeight = document.getElementById("banner")?.getBoundingClientRect().height;
            const navHeight = document.getElementById("details-page-nav")?.getBoundingClientRect().height;
            const adjustment = bannerHeight + navHeight;

            const activeSection = [interactionsRef, websiteRef, aboutRef, hoursRef, detailsRef, reviewsRef]
                .find(({current}) => {
                    if (!current) return false;

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

            if (nameRef?.current?.getBoundingClientRect()?.bottom - bannerHeight <= 0) {
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

    const isOpen = checkIsOpen(restaurant);

    const formattedAddress = `${street1}${city ? `, ${city}` : ""}${postalCode ? `, ${postalCode}` : ""}`;

    const handleNavLinkClick = (text) => {
        const elementRef = [interactionsRef, websiteRef, aboutRef, hoursRef, detailsRef, reviewsRef]
            .find(({current}) => current.id === text)?.current;

        if (!elementRef) return;

        const elementPosition = elementRef.offsetTop;
        const bannerHeight = document.getElementById("banner").getBoundingClientRect().height;
        const navHeight = document.getElementById("details-page-nav").getBoundingClientRect().height;

        window.scrollTo({
            top: elementPosition - (bannerHeight + navHeight + 5),
            behavior: "smooth"
        });
    };

    return (
        <div className="details-page container">
            {popupIsVisible && <CheckInConfirmationPopup restaurant={restaurant} name={name} checkedIn={checkedIn}/>}

            <div className="bookmark-feedback" style={{opacity: checkInFeedbackIsVisible ? 1 : 0}}>
                {addedCheckIn ? "Saved " : "Removed "} check-in
                <FontAwesomeIcon icon={addedCheckIn ? faCircleCheck : faXmark} className="bookmark-feedback-icon"/>
            </div>

            <BannerView
                ref={bannerRef}
                restaurant={restaurant}
                scrollPosition={scrollPosition}
                showName={showNameInBanner}
            />

            <ImageAndInfoView
                ref={nameRef}
                id={id}
                name={name}
                photoUrl={photoUrl}
                starRating={starRating}
                price={price}
                priceLevel={priceLevel}
                formattedAddress={formattedAddress}
                phone={phone}
                isOpen={isOpen}
            />

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
                <section id="Interactions" ref={interactionsRef}>
                    <InteractionsView {...interactions}/>
                </section>

                {website && (
                    <section id="Website" ref={websiteRef} className="website">
                        <WebsiteView url={website}/>
                    </section>
                )}

                <section id="About" ref={aboutRef} className="description">
                    <AboutView description={description}/>
                </section>

                <section id="Hours" ref={hoursRef} className="hours">
                    <HoursView hours={hours}/>
                </section>

                <section id="Details" ref={detailsRef}>
                    <AdditionalDetailsView
                        formattedAddress={formattedAddress}
                        price={price}
                        priceLevel={priceLevel}
                        primaryCuisine={primaryCuisine}
                        dietaryRestrictions={dietaryRestrictions}
                    />
                </section>

                <section id="Reviews" ref={reviewsRef}>
                    <ReviewsSection userId={userId} restaurant={restaurant}/>
                </section>
            </div>
        </div>
    );
};

export default DetailsPage;