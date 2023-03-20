import RestaurantCard from "../../../../common/components/RestaurantCard/RestaurantCard";
import {displayRestaurant, selectRouteDetails} from "../../../map/mapSlice";
import {useDispatch, useSelector} from "react-redux";
import {selectActiveSlide} from "../../sliderSlice";
import {selectRestaurants} from "../../../restaurants/restaurantsSlice";
import {useEffect, useState} from "react";

const MapRestaurantCard = ({restaurant, index}) => {

    // used to access reducer functions inside map slice
    const dispatch = useDispatch();

    // select all relevant information from slices
    const activeSlide = useSelector(selectActiveSlide);
    const restaurants = useSelector(selectRestaurants);
    const {coordinates: routeCoordinates} = useSelector(selectRouteDetails);

    const [style, setStyle] = useState({
        left: index * 101 + "%",
        visibility: "visible"
    });

    useEffect(() => {
        setStyle(style => {
            const updatedStyle = {...style};
            updatedStyle.left = 101 * (index - activeSlide) + "%";
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
        <RestaurantCard
            restaurant={restaurant}
            view="map"
            style={style}
        />
    );
};

export default MapRestaurantCard;