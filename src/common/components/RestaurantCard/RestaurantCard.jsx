import "./RestaurantCard.css";

// do not display id in the dom - it is just there in case we want to add a click function
const RestaurantCard = ({id, name, rating, distance, price, primaryCuisine, photoUrl}) => {
    return (
        <div className="restaurant-card-container"></div>
    );
};

export default RestaurantCard;
