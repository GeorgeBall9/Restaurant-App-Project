/*
Description: Map component to be displayed in MapPage route
Author: Ryan Henzell-Hill
Contact: ryan.henzell-hill@outlook.com
*/

// styles files
import "./Map.css";

// dependencies
import ReactMapGl from "react-map-gl";
import mapboxgl from "mapbox-gl";

// react hooks
import {useEffect, useState} from "react";

// redux hooks
import {useSelector} from "react-redux";

// map reducer functions
import {selectDisplayedRestaurant, selectRouteDetails} from "../mapSlice";

// restaurants reducer functions
import {selectRestaurants} from "../../restaurants/restaurantsSlice";

import {selectUserPosition} from "../../location/locationSlice";

// imported components
import Route from "./Route/Route";
import RestaurantMarker from "./RestaurantMarker/RestaurantMarker";
import LocationMarker from "./LocationMarker/LocationMarker";

// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

const Map = () => {

    // select all relevant information from map slice
    const userPosition = useSelector(selectUserPosition);
    const displayedRestaurant = useSelector(selectDisplayedRestaurant);

    const {
        coordinates: routeCoordinates,
        travelTime,
        status: routeStatus,
        error: routeError
    } = useSelector(selectRouteDetails);

    // select all relevant information from restaurants slice
    const restaurants = useSelector(selectRestaurants);

    // component state
    // to keep reference for map once it is loaded
    const [map, setMap] = useState(null);

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
    const handleMapLoad = ({target}) => setMap(target);

    // fly to new marker if user updates their position
    useEffect(() => {
        if (!userPosition || !map) return;

        const {longitude, latitude} = userPosition;
        map.flyTo({center: [longitude, latitude], zoom: 14});
    }, [userPosition]);

    const [windowHeight, setWindowHeight] = useState(window.innerHeight);

    useEffect(() => {
        setWindowHeight(window.innerHeight)
    }, [window.innerHeight]);

    // component returned to MapPage route
    return (
        <ReactMapGl
            {...viewState}
            style={{width: "100vw", height: windowHeight}}
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
    );
};

export default Map;