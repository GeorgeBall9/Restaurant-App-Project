import RestaurantCard from "../../../../common/components/RestaurantCard/RestaurantCard";
import {displayRestaurant, selectRouteDetails} from "../../../map/mapSlice";
import {useDispatch, useSelector} from "react-redux";
import {changeSlide, selectActiveSlide} from "../../sliderSlice";
import {selectRestaurants} from "../../../restaurants/restaurantsSlice";
import {useEffect, useState} from "react";
import {useSwipeable} from "react-swipeable";

import "./MapRestaurantCard.css";

const MapRestaurantCard = ({restaurant, index}) => {

    // used to access reducer functions inside map slice
    const dispatch = useDispatch();

    // select all relevant information from slices
    const activeSlide = useSelector(selectActiveSlide);
    const restaurants = useSelector(selectRestaurants);
    const {coordinates: routeCoordinates} = useSelector(selectRouteDetails);

    return (
        <div className="map-restaurant-card-container">
            <RestaurantCard
                restaurant={restaurant}
                view="map"
                ranking={index + 1}
            />
        </div>
    );
};

export default MapRestaurantCard;