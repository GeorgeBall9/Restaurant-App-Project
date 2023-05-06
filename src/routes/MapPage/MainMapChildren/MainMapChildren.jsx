/*
Description: MainMapChildren component to be displayed in MapPage route
Author: Ryan Henzell-Hill
Contact: ryan.henzell-hill@outlook.com
*/

// styles files
import "../../../features/map/Map/Map.css";

// redux hooks
import {useSelector} from "react-redux";

// map reducer functions
import {selectDisplayedRestaurant, selectRouteDetails} from "../../../features/map/mapSlice";

// restaurants reducer functions
import {selectRestaurants} from "../../../features/restaurants/restaurantsSlice";

import {selectUserPosition} from "../../../features/location/locationSlice";

// imported components
import Route from "../../../features/map/Map/Route/Route";
import RestaurantMarker from "../../../features/map/Map/RestaurantMarker/RestaurantMarker";
import LocationMarker from "../../../features/map/Map/LocationMarker/LocationMarker";

const MainMapChildren = () => {

    const userPosition = useSelector(selectUserPosition);
    const displayedRestaurant = useSelector(selectDisplayedRestaurant);
    const restaurants = useSelector(selectRestaurants);

    const {
        coordinates: routeCoordinates,
        travelTime,
        status: routeStatus,
        error: routeError
    } = useSelector(selectRouteDetails);

    return (
        <>
            <LocationMarker
                longitude={userPosition.longitude}
                latitude={userPosition.latitude}
            />

            {restaurants && restaurants
                .map((restaurant, index) => (
                    <RestaurantMarker
                        key={restaurant.id}
                        restaurant={restaurant}
                        index={index}
                        selected={!routeCoordinates && restaurant.id === displayedRestaurant?.id}
                        visible={!routeCoordinates || restaurant.id === displayedRestaurant?.id}
                    />
                ))}

            {routeCoordinates && (
                <Route
                    displayedRestaurant={displayedRestaurant}
                    routeCoordinates={routeCoordinates}
                    travelTime={travelTime}
                />
            )}
        </>
    );
};

export default MainMapChildren;