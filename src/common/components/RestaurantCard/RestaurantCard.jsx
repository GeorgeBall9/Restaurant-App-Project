import "./RestaurantCard.css";
import {faLocationArrow, faStar, faStarHalf} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const RestaurantCard = ({id, name, rating, distance, price, primaryCuisine, photoUrl}) => {

    return (
      <div className="restaurant-card-container">
        <div className="restaurant-card-image-container">
          <img src={photoUrl} alt={name} className="restaurant-card-image" />
        </div>
        <div className="restaurant-card-details">
          <h3 className="restaurant-card-name">{ name }</h3>
          <div className="restaurant-card-rating">
            <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
            <span>{rating}</span>
            <span className="restaurant-card-distance">{ distance } mi</span>
          </div>
          <div className="restaurant-card-price">
            <span>{price}</span>
            <span className="restaurant-card-cuisine">{ primaryCuisine }</span>
          </div>
        </div>
        <div className="restaurant-card-location">
          <FontAwesomeIcon icon={ faLocationArrow } />
        </div>
      </div>
    );
  };



// do not display id in the dom - it is just there in case we want to add a click function
// const RestaurantCard = ({id, name, rating, distance, price, primaryCuisine, photoUrl}) => {
//     return (
//         <div className="restaurant-card-container">
//             <FontAwesomeIcon icon={faLocationArrow} />
//             <h2>{ name } </h2>
//         </div>
//     );
// };

export default RestaurantCard;
