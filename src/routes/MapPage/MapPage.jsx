/*
Description: Map component to be displayed in MapPage route
Author: Ryan Henzell-Hill
Contact: ryan.henzell-hill@outlook.com
*/

// style sheet
import "./MapPage.css";

// imported components
import Map from "../../features/map/Map/Map";
import RestaurantCard from "../../common/components/RestaurantCard/RestaurantCard";

// redux imports
import {useSelector} from "react-redux";
import {selectDisplayedRestaurant} from "../../features/map/mapSlice";
import {useEffect} from "react";

const MapPage = () => {

    const displayedRestaurant = useSelector(selectDisplayedRestaurant);

    return (
        <div className="mapview-container">
            <Map/>

            <div className="restaurant-card-container">
                {displayedRestaurant && (
                    <RestaurantCard {...displayedRestaurant} openingHours={displayedRestaurant.hours[6]}/>
                )}
            </div>
        </div>
    );
};

export default MapPage;