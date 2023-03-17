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
import {faStar as faEmptyStar} from "@fortawesome/free-regular-svg-icons";
import {fetchRoute, selectDisplayedRestaurant, selectUserPosition} from "../../../features/map/mapSlice";
import {useDispatch, useSelector} from "react-redux";

// do not display id in the dom - it is just there in case we want to add a click function

// A card component for displaying restaurant information
const RestaurantCard = ({id, name, rating, openingHours, price, primaryCuisine, photoUrl, view, index}) => {

    // used to access reducer functions inside map slice
    const dispatch = useDispatch();

    // select all relevant information from map slice
    const userPosition = useSelector(selectUserPosition);
    const displayedRestaurant = useSelector(selectDisplayedRestaurant);

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
    }

    const position = {left: index * 101 + "%"};

    const handleDrag = (event) => {
        event.preventDefault();
        console.log(event.dataTransfer);
    }

    // Render the component
    return (
        <div className={`restaurant-card position-${index}`} style={position} onDragStart={handleDrag}>
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
                {view === "map" && (
                    <FontAwesomeIcon icon={faRoute} className="icon" onClick={handleRouteButtonClick}/>
                )}

                <div className="image-container">
                    <img src={photoUrl} alt={name}/>
                </div>
            </div>
        </div>
    );
};


export default RestaurantCard;


