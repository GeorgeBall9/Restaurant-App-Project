/*
Description: Restaurant card component
Author: George Ball
Contact: georgeball14@hotmail.com
*/

// styles file
import "./RestaurantCard.css";

// FontAwesome icons
import {faLocationArrow, faStar, faStarHalfStroke, faSterlingSign} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


// do not display id in the dom - it is just there in case we want to add a click function

// A card component for displaying restaurant information
const RestaurantCard = ({id, name, rating, distance, price, primaryCuisine, photoUrl}) => {

    // Convert number rating into star representaion on the restaurant card
    const starRating = Math.round(rating * 2) / 2; // round to nearest half
    const fullStars = Math.floor(starRating);
    const halfStar = starRating - fullStars > 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    const starIcons = [];
    
    // Create an arry of FontAwesomeIcons to display the star rating
    for (let i = 0; i < fullStars; i++) {
        starIcons.push(<FontAwesomeIcon key={i} icon={faStar} />);
    }

    if (halfStar) {
        starIcons.push(<FontAwesomeIcon key="half" icon={faStarHalfStroke} half="true" />);
    }

    for (let i = 0; i < emptyStars; i++) {
        starIcons.push(<FontAwesomeIcon key={i + fullStars + (halfStar ? 1 : 0)} icon={faStar} regular="true" />);
    }

    // Create the price display if the price is unknown
    const priceDisplay = price !== "Unknown" ? (
        <div className="restaurant-card-price">
          <FontAwesomeIcon icon={faSterlingSign}></FontAwesomeIcon>
          <span>{price}</span>
          <span className="restaurant-card-cuisine">{primaryCuisine}</span>
        </div>
      ) : null;
    
    // Render the component
    return (
      <div className="restaurant-card-container">
        
        <div className="restaurant-card-details">
          <h3 className="restaurant-card-name">{name}</h3>
            <div className="restaurant-card-rating">
            {starIcons}
            <span>{rating}</span>
          </div>
          <div className="restaurant-card-distance">
            <FontAwesomeIcon icon={faLocationArrow} />{distance} km
            </div>
          <div className="restaurant-card-price">
            {priceDisplay}
            <span className="restaurant-card-cuisine">{primaryCuisine}</span>
          </div>
        </div>
        <div className="restaurant-card-location">
          <FontAwesomeIcon icon={faLocationArrow} />
        </div>
        <div className="restaurant-card-image-container">
          <img src={photoUrl} alt={name} className="restaurant-card-image" />
        </div>
      </div>
    );
  };


export default RestaurantCard;


