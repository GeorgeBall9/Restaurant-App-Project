/*
Description: Restaurant card component
Author: George Ball
Contact: georgeball14@hotmail.com
*/

// styles file
import "./RestaurantCard.css";

// FontAwesome icons
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLocationArrow} from "@fortawesome/free-solid-svg-icons";

import StarRating from "./StarRating/StarRating";
import RouteButton from "./RouteButton/RouteButton";
import BookmarkButton from "./BookmarkButton/BookmarkButton";
import {useSwipeable} from "react-swipeable";
import {changeSlide} from "../../../features/slider/sliderSlice";
import {useDispatch} from "react-redux";

// A card component for displaying restaurant information
const RestaurantCard = ({restaurant, view, ranking, active}) => {

    const {name, rating, distance, price, primaryCuisine, photoUrl} = restaurant;

    // Convert number rating into star representation on the restaurant card
    const starRating = Math.round(rating * 2) / 2; // round to nearest half

    // Render the component
    return (
        <div className="restaurant-card">
            <div className="details-container">
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
                    {price !== "Unknown" && <p>{price}</p>}
                    <span className="cuisine">{primaryCuisine}</span>
                </div>
            </div>

            <div className="container-rhs">
                <div className="icons-container">
                    <BookmarkButton/>
                    {view === "map" && active && <RouteButton/>}
                </div>

                <div className="image-container">
                    <img src={photoUrl} alt={name}/>
                </div>
            </div>
        </div>
    );
};


export default RestaurantCard;


