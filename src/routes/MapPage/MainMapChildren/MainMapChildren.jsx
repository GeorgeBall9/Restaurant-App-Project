/*
Description: MainMapChildren component to be displayed in MapPage route
Author: Ryan Henzell-Hill
Contact: ryan.henzell-hill@outlook.com
*/

// styles files
import "../../../common/components/MapView/MapView.css";

// redux hooks
import {useSelector} from "react-redux";

// map reducer functions
import {selectRouteDetails} from "../../../features/map/mapSlice";

// imported components
import Route from "../../../common/components/Route/Route";
import RestaurantMarker from "../../../common/components/RestaurantMarker/RestaurantMarker";
import LocationMarker from "./LocationMarker/LocationMarker";

const MainMapChildren = ({userPosition, restaurants, displayedRestaurant}) => {

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