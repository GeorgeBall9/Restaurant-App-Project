/*
Description: Restaurant card component
Author: George Ball
Contact: georgeball14@hotmail.com
*/

// styles file
import "./RestaurantCard.css";

// FontAwesome icons
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faClock,
    faMapLocationDot, faRoute,
    faStar,
    faStarHalfStroke,
} from "@fortawesome/free-solid-svg-icons";
import {faBookmark, faStar as faEmptyStar} from "@fortawesome/free-regular-svg-icons";
import {
    displayRestaurant,
    fetchRoute,
    selectDisplayedRestaurant, selectRouteDetails,
    selectUserPosition
} from "../../../features/map/mapSlice";
import {useDispatch, useSelector} from "react-redux";
import {selectActiveSlide} from "../../../features/slider/sliderSlice";
import {useEffect, useState} from "react";
import {selectRestaurants} from "../../../features/restaurants/restaurantsSlice";

// do not display id in the dom - it is just there in case we want to add a click function

// A card component for displaying restaurant information
const RestaurantCard = ({restaurant, openingHours, view, index}) => {

    const {name, rating, price, primaryCuisine, photoUrl} = restaurant;

    // used to access reducer functions inside map slice
    const dispatch = useDispatch();

    // select all relevant information from map slice
    const userPosition = useSelector(selectUserPosition);
    const displayedRestaurant = useSelector(selectDisplayedRestaurant);
    const activeSlide = useSelector(selectActiveSlide);
    const restaurants = useSelector(selectRestaurants);

    // Convert number rating into star representation on the restaurant card
    const starRating = Math.round(rating * 2) / 2; // round to nearest half
    const fullStars = Math.floor(starRating);
    const halfStar = starRating - fullStars > 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    const handleRouteButtonClick = () => {
        if (!displayedRestaurant) return;

        const coordinates1 = userPosition;

        const {latitude: rLat, longitude: rLon} = displayedRestaurant;
        const coordinates2 = {latitude: rLat, longitude: rLon};

        // fetches route from redux map slice
        dispatch(fetchRoute({coordinates1, coordinates2}));
    };

    const [position, setPosition] = useState({left: index * 101 + "%"});

    useEffect(() => {
        setPosition((position) => {
            const updatedPosition = {...position};
            updatedPosition.left = 101 * (index - activeSlide) + "%";
            return updatedPosition;
        });

        if (index === activeSlide) {
            dispatch(displayRestaurant(restaurant));
        }
    }, [activeSlide, restaurants]);

    const {coordinates: routeCoordinates} = useSelector(selectRouteDetails);

    useEffect(() => {
        const hidden = routeCoordinates && index !== activeSlide;

        setPosition((position) => {
            const updatedPosition = {...position};
            updatedPosition.visibility = hidden ? "hidden" : "visible";
            return updatedPosition;
        });
    }, [routeCoordinates]);

    const icon = view === "map" ? faRoute : faBookmark;

    // Render the component
    return (
        <div className="restaurant-card" style={position}>
            <div className="details-container">
                <h3>{name}</h3>

                <div className="rating-container">
                    {[...Array(fullStars)].map((star, i) => (
                        <FontAwesomeIcon key={i} icon={faStar} className="icon"/>
                    ))}

                    {halfStar && <FontAwesomeIcon icon={faStarHalfStroke} className="icon"/>}

                    {emptyStars > 0 && [...Array(emptyStars)].map((star, i) => (
                        <FontAwesomeIcon key={i} icon={faEmptyStar} className="icon"/>
                    ))}

                    <span>{starRating}</span>
                </div>

                <div className="hours-container">
                    <FontAwesomeIcon icon={faClock} className="icon"/>
                    {openingHours}
                </div>

                <div className="price-cuisine-container">

                    {price !== "Unknown" && <p>{price}</p>}

                    <span className="cuisine">{primaryCuisine}</span>
                </div>
            </div>

            <div className="container-rhs">
                <FontAwesomeIcon icon={icon} className="icon" onClick={handleRouteButtonClick}/>

                <div className="image-container">
                    <img src={photoUrl} alt={name}/>
                </div>
            </div>
        </div>
    );
};


export default RestaurantCard;


