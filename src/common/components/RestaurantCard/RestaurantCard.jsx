/*
Description: Restaurant card component
Author: George Ball
Contact: georgeball14@hotmail.com
*/

// styles file
import "./RestaurantCard.css";

// FontAwesome icons
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClock, faEllipsis, faRoute} from "@fortawesome/free-solid-svg-icons";
import {faBookmark} from "@fortawesome/free-regular-svg-icons";
import StarRating from "./StarRating/StarRating";

// A card component for displaying restaurant information
const RestaurantCard = ({restaurant, openingHours, view, style, handleClick}) => {

    const {name, rating, price, primaryCuisine, photoUrl} = restaurant;

    // Convert number rating into star representation on the restaurant card
    const starRating = Math.round(rating * 2) / 2; // round to nearest half

    // Render the component
    return (
        <div className="restaurant-card" style={style}>
            <div className="details-container">
                <h3>{name}</h3>

                <StarRating rating={starRating}/>

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
                <div className="icons-container">
                    <FontAwesomeIcon icon={faBookmark} className="icon"/>
                    {view === "map" && (
                        <FontAwesomeIcon icon={faRoute} className="icon" onClick={handleClick}/>
                    )}
                </div>

                <div className="image-container">
                    <img src={photoUrl} alt={name}/>
                </div>
            </div>
        </div>
    );
};


export default RestaurantCard;


