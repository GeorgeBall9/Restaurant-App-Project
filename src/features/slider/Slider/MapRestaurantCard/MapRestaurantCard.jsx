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

    const position = window.innerWidth > 500 ? 500 : window.innerWidth;
    const offset = (window.innerWidth - position) / 2;

    const [style, setStyle] = useState({
        left: offset + (index * (position - 26)) + "px",
        visibility: "visible"
    });

    useEffect(() => {
        setStyle(style => {
            const updatedStyle = {...style};
            updatedStyle.left = offset + ((position - 26) * (index - activeSlide)) + "px";
            return updatedStyle;
        });

        if (index === activeSlide) {
            dispatch(displayRestaurant(restaurant));
        }
    }, [activeSlide, restaurants]);

    useEffect(() => {
        const hidden = routeCoordinates && index !== activeSlide;

        setStyle(style => {
            const updatedStyle = {...style};
            updatedStyle.visibility = hidden ? "hidden" : "visible";
            return updatedStyle;
        });
    }, [routeCoordinates]);

    return (
        <div className="map-restaurant-card-container" style={style}>
            <RestaurantCard
                restaurant={restaurant}
                view="map"
                ranking={index + 1}
            />
        </div>
    );
};

export default MapRestaurantCard;