import "./HomeCard.css";
import StarRating from "../../../../common/components/StarRating/StarRating";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLocationArrow, faUtensils} from "@fortawesome/free-solid-svg-icons";
import BookmarkButton from "../../../../common/components/BookmarkButton/BookmarkButton";
import {useNavigate} from "react-router-dom";
import {useSwipeable} from "react-swipeable";

const HomeCard = ({restaurant}) => {

    const {id, name, rating, distance, price, primaryCuisine, photoUrl} = restaurant;

    // Convert number rating into star representation on the restaurant card
    const starRating = Math.round(rating * 2) / 2; // round to nearest half

    const navigate = useNavigate();

    const showRestaurantDetails = (event) => {
        if (event.target.closest(".bookmark-button")) return;

        navigate(`/details/${restaurant.id}`);
    };

    return (
        <div className="home-card" onClick={showRestaurantDetails}>
            {/* to be replaced with true implementation */}
            {(id === "19769400" || id === "3820646" || id === "12510235") && (
                <div className="highlight-banner">Highly recommended</div>
            )}

            <div className="restaurant-image-background" style={{backgroundImage: `url(${photoUrl})`}}></div>

            <div className="details-container">
                <h3>
                    <div>{name}</div>

                    <BookmarkButton restaurant={restaurant}/>
                </h3>

                <StarRating rating={starRating}/>

                <div className="price-cuisine-container">
                    <div className="distance-container">
                        <FontAwesomeIcon icon={faLocationArrow} className="icon"/>
                        {Math.round(distance * 10) / 10} Km
                    </div>

                    <div>
                        {price && price !== "Unknown" && <p>{price}</p>}

                        {price && price !== "Unknown" && <span className="dot-separator"></span>}

                        <span className="cuisine">
                            <FontAwesomeIcon icon={faUtensils} className="icon"/>
                            {primaryCuisine}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeCard;