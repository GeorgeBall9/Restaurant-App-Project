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
    faMapLocationDot,
    faStar,
    faStarHalfStroke,
} from "@fortawesome/free-solid-svg-icons";
import {faStar as faEmptyStar} from "@fortawesome/free-regular-svg-icons";

// do not display id in the dom - it is just there in case we want to add a click function

// A card component for displaying restaurant information
const RestaurantCard = ({id, name, rating, openingHours, price, primaryCuisine, photoUrl, view}) => {

    // Convert number rating into star representation on the restaurant card
    const starRating = Math.round(rating * 2) / 2; // round to nearest half
    const fullStars = Math.floor(starRating);
    const halfStar = starRating - fullStars > 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);


    // Render the component
    return (
        <div className="restaurant-card">
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
                {view !== "map" && (
                    <FontAwesomeIcon icon={faMapLocationDot} className="icon"/>
                )}

                <div className="image-container">
                    <img src={photoUrl} alt={name}/>
                </div>
            </div>
        </div>
    );
};


export default RestaurantCard;


