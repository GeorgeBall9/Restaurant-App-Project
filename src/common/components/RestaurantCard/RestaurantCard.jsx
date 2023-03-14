import "./RestaurantCard.css";
import {faLocationArrow} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

// do not display id in the dom - it is just there in case we want to add a click function
const RestaurantCard = ({id, name, rating, distance, price, primaryCuisine, photoUrl}) => {
    return (
        <div className="restaurant-card-container">
            <FontAwesomeIcon icon={faLocationArrow} />
        </div>
    );
};

export default RestaurantCard;
