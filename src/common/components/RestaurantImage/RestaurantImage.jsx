import "./RestaurantImage.css";

const RestaurantImage = ({photoUrl, name}) => {
    return (
        <div className="restaurant-image-container">
            <img src={photoUrl} alt={name} loading="lazy"/>
        </div>
    );
};

export default RestaurantImage;