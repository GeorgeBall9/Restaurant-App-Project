import "./MapRestaurantCard.css";

import RestaurantCard from "../../../../common/components/RestaurantCard/RestaurantCard";

import {useSelector} from "react-redux";
import {selectActiveSlide} from "../../sliderSlice";
import {selectRouteDetails} from "../../../map/mapSlice";

const MapRestaurantCard = ({restaurant, index}) => {

    const activeSlide = useSelector(selectActiveSlide);

    const {coordinates: routeCoordinates} = useSelector(selectRouteDetails);

    const isActive = index === activeSlide;

    const style = {
        visibility: !routeCoordinates || isActive ? "visible" : "hidden"
    };

    return (
        <div className="map-restaurant-card-container" style={style}>
            <RestaurantCard
                restaurant={restaurant}
                view="map"
                ranking={index + 1}
                active={isActive}
            />
        </div>
    );
};

export default MapRestaurantCard;