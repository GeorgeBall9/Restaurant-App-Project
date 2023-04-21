import "./HomeCard.css";
import StarRating from "../../../../common/components/StarRating/StarRating";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLocationArrow} from "@fortawesome/free-solid-svg-icons";
import BookmarkButton from "../../../../common/components/BookmarkButton/BookmarkButton";
import RouteButton from "../../../../common/components/RestaurantCard/RouteButton/RouteButton";
import RestaurantImage from "../../../../common/components/RestaurantImage/RestaurantImage";
import {useNavigate} from "react-router-dom";
import {useSwipeable} from "react-swipeable";
import {useEffect} from "react";

const HomeCard = ({restaurant}) => {

    const {id, name, rating, distance, price, primaryCuisine, photoUrl} = restaurant;

    // Convert number rating into star representation on the restaurant card
    const starRating = Math.round(rating * 2) / 2; // round to nearest half

    const navigate = useNavigate();

    const showRestaurantDetails = (event) => {
        if (event.event.target.closest(".container-rhs")) return;

        navigate(`/details/${restaurant.id}`);
    };

    const handlers = useSwipeable({
        onTap: (event) => showRestaurantDetails(event),
        preventScrollOnSwipe: true,
        trackMouse: true
    });

    return (
        <div className="home-card" {...handlers}>
            <div className="highlight-banner">Highly recommended</div>

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
                        {price !== "Unknown" && <p>{price}</p>}
                        <span className="cuisine">{primaryCuisine}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeCard;