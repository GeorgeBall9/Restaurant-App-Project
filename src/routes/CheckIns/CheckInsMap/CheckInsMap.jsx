import "./CheckInsMap.css";
import {useDispatch, useSelector} from "react-redux";
import {selectUserPosition} from "../../../features/location/locationSlice";
import {selectDisplayedRestaurant, selectRouteDetails} from "../../../features/map/mapSlice";
import {selectRestaurants, selectRestaurantsFetchStatus} from "../../../features/restaurants/restaurantsSlice";
import {useEffect, useState} from "react";
import {hideSpinner, showSpinner} from "../../../features/spinner/spinnerSlice";
import ReactMapGl from "react-map-gl";
import LocationMarker from "../../../features/map/Map/LocationMarker/LocationMarker";
import RestaurantMarker from "../../../features/map/Map/RestaurantMarker/RestaurantMarker";
import Route from "../../../features/map/Map/Route/Route";

const CheckInsMap = () => {

    const dispatch = useDispatch();

    // select all relevant information from map slice
    const userPosition = useSelector(selectUserPosition);
    const displayedRestaurant = useSelector(selectDisplayedRestaurant);
    const restaurantsFetchStatus = useSelector(selectRestaurantsFetchStatus);

    const [map, setMap] = useState(null);

    const {
        coordinates: routeCoordinates,
        travelTime,
        status: routeStatus,
        error: routeError
    } = useSelector(selectRouteDetails);

    // select all relevant information from restaurants slice
    const restaurants = useSelector(selectRestaurants);

    // view state of map - will change as user moves the map
    const [viewState, setViewState] = useState({
        latitude: userPosition.latitude,
        longitude: userPosition.longitude,
        zoom: 14
    });

    // handler functions

    // handler function to change the view state when the user moves the map
    const handleMapMove = (e) => setViewState(e.viewState);

    // handler function to set the map held in the component state to the map when it is loaded
    const handleMapLoad = ({target}) => {
        setMap(target);

        if (restaurantsFetchStatus !== "pending") {
            dispatch(hideSpinner());
        }
    };

    // fly to new marker if user updates their position
    useEffect(() => {
        if (!userPosition || !map) return;

        const {longitude, latitude} = userPosition;
        map.flyTo({center: [longitude, latitude], zoom: 14});
    }, [userPosition]);

    useEffect(() => {
        if (restaurantsFetchStatus === "pending") {
            dispatch(showSpinner());
        } else if (map) {
            dispatch(hideSpinner());
        }
    }, [restaurantsFetchStatus]);

    useEffect(() => {
        if (!map) {
            dispatch(showSpinner());
        } else {
            dispatch(hideSpinner());
        }
    }, [map]);

    useEffect(() => {
        if (!displayedRestaurant || !map) return;

        const {longitude, latitude} = displayedRestaurant;

        requestAnimationFrame(() => {
            map.flyTo({center: [longitude, latitude], essential: true, speed: 0.5});
        });
    },[displayedRestaurant]);

    // component returned to MapPage route
    return (
        <div className="map-container">
            <ReactMapGl
                {...viewState}
                style={{width: "100%", height: "220px"}}
                mapStyle="mapbox://styles/mapbox/streets-v12"
                onMove={handleMapMove}
                onLoad={handleMapLoad}
                mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                onRender={({target}) => target.resize()}
            >
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
            </ReactMapGl>
        </div>
    );
};

export default CheckInsMap;