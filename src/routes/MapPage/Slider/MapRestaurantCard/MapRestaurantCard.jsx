/*
 Description: Map page restaurant card component.
 Author: Ryan Henzell-Hill
 Contact: ryan.henzell-hill@outlook.com
 */
// stylesheet
import "./MapRestaurantCard.css";
// Import dependencies
import RestaurantCard from "../../../../common/components/RestaurantCard/RestaurantCard";

import {useSelector} from "react-redux";
import {selectActiveSlide} from "../../../../features/slider/sliderSlice";
import {selectRouteDetails} from "../../../../features/map/mapSlice";

const MapRestaurantCard = ({restaurant, index}) => {

    const activeSlide = useSelector(selectActiveSlide);

    const {coordinates: routeCoordinates} = useSelector(selectRouteDetails);

    // Hide card if route is active
    const style = {
        visibility: !routeCoordinates || index === activeSlide ? "visible" : "hidden"
    };

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