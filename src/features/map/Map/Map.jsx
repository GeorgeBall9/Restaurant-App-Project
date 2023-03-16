/*
Description: Map component to be displayed in MapPage route
Author: Ryan Henzell-Hill
Contact: ryan.henzell-hill@outlook.com
*/

// styles files
import "./Map.css";

// dependencies
import ReactMapGl, {Popup} from "react-map-gl";

// react hooks
import {useEffect, useState} from "react";

// redux hooks
import {useSelector, useDispatch} from "react-redux";

// map reducer functions
import {
    selectUserPosition,
    selectDisplayedRestaurant,
    displayRestaurant,
    resetDisplayedRestaurant,
    fetchRoute,
    selectRouteDetails
} from "../mapSlice";

// restaurants reducer functions
import {selectRestaurants} from "../../restaurants/restaurantsSlice";

// imported components
import MapMarker from "./MapMarker/MapMarker";
import Route from "./Route/Route";

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
        zoom: 13
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

        // checks if there is already a displayed restaurant
        if (!displayedRestaurant) {
            const restaurantToDisplay = restaurants.find(restaurant => restaurant.id === id);
            dispatch(displayRestaurant(restaurantToDisplay));
        } else {
            // removes displayed restaurant so that route can be shown on click and hidden if clicked again
            dispatch(resetDisplayedRestaurant());
        }
    };

    // use effect functions - only executed when dependencies change
    // runs when displayed restaurant is updated and fetches the route to the restaurant from the user
    useEffect(() => {
        if (!displayedRestaurant) return; // if there is no displayed restaurant, route is not requested

        const coordinates1 = userPosition;

        const {latitude: rLat, longitude: rLon} = displayedRestaurant;
        const coordinates2 = {latitude: rLat, longitude: rLon};

        // fetches route from redux map slice
        dispatch(fetchRoute({coordinates1, coordinates2}));
    }, [displayedRestaurant]);

    // runs when the route error is updated - only occurs when the route starts fetching or when the fetch fails
    useEffect(() => {
        if (!routeError) return; // if there is no route error, do nothing

        console.error(routeError); // displayed error in console for debugging purposes
        dispatch(resetDisplayedRestaurant()); // remove displayed restaurant since route fetch failed
    }, [routeError]);

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

            <Popup
                longitude={userPosition.longitude}
                latitude={userPosition.latitude}
                anchor="bottom"
                closeButton={false}
                offset={50}
            >
                You are here
            </Popup>

            {restaurants && restaurants
                .filter(restaurant => !displayedRestaurant || restaurant.id === displayedRestaurant.id)
                .map(({id, longitude, latitude}) => (
                    <MapMarker
                        key={id}
                        id={id}
                        longitude={longitude}
                        latitude={latitude}
                        type="restaurant"
                        handleClick={handleMarkerClick}
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