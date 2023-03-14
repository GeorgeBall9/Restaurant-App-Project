import "./Map.css";

import ReactMapGl from "react-map-gl";
import {useEffect, useState} from "react";

import {useSelector, useDispatch} from "react-redux";

import {
    selectUserPosition,
    selectDisplayedRestaurant,
    displayRestaurant,
    resetDisplayedRestaurant,
    fetchRoute,
    selectRouteDetails
} from "../mapSlice";

import {selectRestaurants} from "../../restaurants/restaurantsSlice";

import MapMarker from "./MapMarker/MapMarker";
import Route from "./Route/Route";

const Map = () => {

    const dispatch = useDispatch();

    const userPosition = useSelector(selectUserPosition);
    const restaurants = useSelector(selectRestaurants);
    const displayedRestaurant = useSelector(selectDisplayedRestaurant);
    const {
        coordinates: routeCoordinates,
        travelTime,
        status: routeStatus,
        error: routeError
    } = useSelector(selectRouteDetails);

    const [map, setMap] = useState(null);

    const [viewState, setViewState] = useState({
        latitude: userPosition.latitude,
        longitude: userPosition.longitude,
        zoom: 13
    });

    const handleMapMove = (e) => {
        setViewState(e.viewState);
    };

    const handleMapLoad = ({target}) => {
        setMap(target);
    };

    const handleMarkerClick = (id) => {
        if (!id) {
            throw new Error("No id provided");
        }

        if (!displayedRestaurant) {
            const restaurantToDisplay = restaurants.find(restaurant => restaurant.id === id);
            dispatch(displayRestaurant(restaurantToDisplay));
        } else {
            dispatch(resetDisplayedRestaurant());
        }
    };

    useEffect(() => {
        if (!displayedRestaurant) return;

        const coordinates1 = userPosition;

        const {latitude: rLat, longitude: rLon} = displayedRestaurant;
        const coordinates2 = {latitude: rLat, longitude: rLon};

        dispatch(fetchRoute({coordinates1, coordinates2}));
    }, [displayedRestaurant]);

    useEffect(() => {
        if (!routeCoordinates) return;

        map.flyTo({zoom: 13})
    }, [routeCoordinates]);

    useEffect(() => {
        if (routeError) {
            console.error(routeError);
            dispatch(resetDisplayedRestaurant());
        }
    }, [routeError]);

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