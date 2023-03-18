/*
Description: Map component to be displayed in MapPage route
Author: Ryan Henzell-Hill
Contact: ryan.henzell-hill@outlook.com
*/

// styles files
import "./Map.css";

// dependencies
import ReactMapGl from "react-map-gl";

// react hooks
import {useEffect, useState} from "react";

// redux hooks
import {useSelector, useDispatch} from "react-redux";

// map reducer functions
import {
    selectUserPosition,
    selectDisplayedRestaurant,
    displayRestaurant,
    selectRouteDetails
} from "../mapSlice";

// restaurants reducer functions
import {selectRestaurants} from "../../restaurants/restaurantsSlice";

// imported components
import MapMarker from "./MapMarker/MapMarker";
import Route from "./Route/Route";
import {setActiveSlide} from "../../slider/sliderSlice";

const Map = () => {

    // used to access reducer functions inside map slice
    const dispatch = useDispatch();

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

    // handler function to display the restaurant associated with the marker that is clicked by the user
    const handleMarkerClick = (id) => {
        if (!id) {
            throw new Error("No id provided");
        }

        const restaurantToDisplay = restaurants.find(restaurant => restaurant.id === id);
        dispatch(displayRestaurant(restaurantToDisplay));
        dispatch(setActiveSlide(restaurants.indexOf(restaurantToDisplay)));
    };

    // fly to new marker if user updates their position
    useEffect(() => {
        if (!userPosition || !map) return;

        const {longitude, latitude} = userPosition;
        map.flyTo({center: [longitude, latitude], zoom: 14});
    }, [userPosition]);

    // component returned to MapPage route
    return (
        <ReactMapGl
            {...viewState}
            style={{width: "100vw", height: "100vh"}}
            mapStyle="mapbox://styles/mapbox/streets-v12"
            onMove={handleMapMove}
            onLoad={handleMapLoad}
            mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        >
            <MapMarker
                longitude={userPosition.longitude}
                latitude={userPosition.latitude}
                type="user"
            />

            {restaurants && restaurants
                .filter(({id}) => !routeCoordinates || id === displayedRestaurant.id)
                .map(({id, longitude, latitude}) => (
                    <MapMarker
                        key={id}
                        id={id}
                        longitude={longitude}
                        latitude={latitude}
                        type="restaurant"
                        handleClick={handleMarkerClick}
                        selected={!routeCoordinates && id === displayedRestaurant?.id}
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