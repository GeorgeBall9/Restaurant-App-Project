/*
Description: Restaurant card component
Author: George Ball
Contact: georgeball14@hotmail.com
*/

// styles file
import "./RestaurantCard.css";

import {useNavigate} from 'react-router-dom';

// FontAwesome icons
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFire, faLocationArrow, faUtensils} from "@fortawesome/free-solid-svg-icons";

import StarRating from "../StarRating/StarRating";
import RouteButton from "./RouteButton/RouteButton";
import BookmarkButton from "../BookmarkButton/BookmarkButton";
import {useSwipeable} from "react-swipeable";
import RestaurantImage from "../RestaurantImage/RestaurantImage";
import RecommendButton from "../../../routes/DetailsPage/BannerView/RecommendButton/RecommendButton";

// A card component for displaying restaurant information
const RestaurantCard = ({restaurant, view, ranking, open}) => {

    const {name, rating, distance, price, primaryCuisine, photoUrl} = restaurant;

    // Convert number rating into star representation on the restaurant card
    const starRating = Math.round(rating * 2) / 2; // round to nearest half

    const navigate = useNavigate();

    const handlers = useSwipeable({
        onTap: () => navigate(`/details/${restaurant.id}`),
        preventScrollOnSwipe: true,
        trackMouse: true
    });

    // Render the component
    return (
        <div className={`restaurant-card ${open ? "" : "closed"}`}>
            <div className="details-container" {...handlers}>
                <h3>
                    {ranking && (
                        <div className="ranking">{ranking}</div>
                    )}

                    <div>{name}</div>
                </h3>

                <StarRating rating={starRating}/>

                <div className="distance-container">
                    <FontAwesomeIcon icon={faLocationArrow} className="icon"/>
                    {Math.round(distance * 10) / 10} Km
                </div>

                <div className="price-cuisine-container">
                    {(price !== "Unknown" && price !== "") && <p>{price}</p>}
                    {(price !== "Unknown" && price !== "") && <span className="dot-separator"></span>}
                    <span className="cuisine"><FontAwesomeIcon icon={faUtensils}
                                                               className="icon"/>{primaryCuisine}</span>
                </div>
            </div>

            <div className="container-rhs">
                <div className="icons-container">
                    <BookmarkButton restaurant={restaurant}/>
                    {view === "map" && <RouteButton/>}
                </div>

                <RestaurantImage photoUrl={photoUrl} name={name}/>
            </div>
        </div>
    );
};


export default RestaurantCard;


