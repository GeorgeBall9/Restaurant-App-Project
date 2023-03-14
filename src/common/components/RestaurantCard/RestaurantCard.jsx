/*
Description: Restaurant card component
Author: George Ball
Contact: georgeball14@hotmail.com
*/

// styles file
import "./RestaurantCard.css";

// FontAwesome icons
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLocationArrow, faStar, faStarHalfStroke, faSterlingSign} from "@fortawesome/free-solid-svg-icons";
import {faStar as faEmptyStar} from "@fortawesome/free-regular-svg-icons";

// do not display id in the dom - it is just there in case we want to add a click function

// A card component for displaying restaurant information
const RestaurantCard = ({id, name, rating, distance, price, primaryCuisine, photoUrl}) => {

    // Convert number rating into star representation on the restaurant card
    const starRating = Math.round(rating * 2) / 2; // round to nearest half
    const fullStars = Math.floor(starRating);
    const halfStar = starRating - fullStars > 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    // Render the component
    return (
        <div className="restaurant-card-container">
            <div className="restaurant-card-details">
                <h3 className="restaurant-card-name">{name}</h3>

                <div className="restaurant-card-rating">
                    {[...Array(fullStars)].map((star, i) => (
                        <FontAwesomeIcon key={i} icon={faStar}/>
                    ))}

                    {halfStar && <FontAwesomeIcon icon={faStarHalfStroke}/>}

                    {emptyStars > 0 && [...Array(emptyStars)].map((star, i) => (
                        <FontAwesomeIcon key={i} icon={faEmptyStar}/>
                    ))}

                    <span>{starRating}</span>
                </div>

                <div className="restaurant-card-distance">
                    <FontAwesomeIcon icon={faLocationArrow}/>{distance} km
                </div>

                <div className="restaurant-card-price">

                    {price !== "Unknown" && (
                        <div className="restaurant-card-price">
                            <FontAwesomeIcon icon={faSterlingSign}/>
                            <span>{price}</span>
                            <span className="restaurant-card-cuisine">{primaryCuisine}</span>
                        </div>
                    )}

                    <span className="restaurant-card-cuisine">{primaryCuisine}</span>
                </div>
            </div>

            <div className="restaurant-card-location">
                <FontAwesomeIcon icon={faLocationArrow}/>
            </div>

            <div className="restaurant-card-image-container">
                <img src={photoUrl} alt={name} className="restaurant-card-image"/>
            </div>
        </div>
    );
};


export default RestaurantCard;


