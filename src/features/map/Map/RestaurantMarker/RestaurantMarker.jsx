import "./RestaurantMarker.css";
import {Marker} from "react-map-gl";
import React from "react";
import {displayRestaurant} from "../../mapSlice";
import {setActiveSlide} from "../../../slider/sliderSlice";
import {useDispatch, useSelector} from "react-redux";
import {selectRestaurants} from "../../../restaurants/restaurantsSlice";

const RestaurantMarker = ({id, name, longitude, latitude, photoUrl, selected, visible}) => {

    const dispatch = useDispatch();

    const restaurants = useSelector(selectRestaurants);

    const style = {
        visibility: visible ? "visible" : "hidden",
        zIndex: selected ? 10 : 0,
    };


    // handler function to display the restaurant associated with the marker that is clicked by the user
    const handleClick = (event, id) => {
        if (!id) {
            throw new Error("No id provided");
        }

        const restaurantToDisplay = restaurants.find(restaurant => restaurant.id === id);
        dispatch(displayRestaurant(restaurantToDisplay));
        dispatch(setActiveSlide(restaurants.indexOf(restaurantToDisplay)));
    };

    return (
        <Marker
            longitude={longitude}
            latitude={latitude}
            anchor="bottom"
            style={style}
        >
            <div
                className={`restaurant-marker-container ${selected ? "selected" : ""}`}
                onClick={(event) => handleClick(event, id)}
            >
                <div className="marker">
                    <img src={photoUrl} alt={`${name} marker`}/>
                </div>

                <div className="triangle"></div>
            </div>
        </Marker>
    );
};

export default RestaurantMarker;