import "./Map.css";

import ReactMapGl from "react-map-gl";
import {useEffect, useState} from "react";

import {useSelector, useDispatch} from "react-redux";

import {
    selectUserPosition,
    selectDisplayedRestaurant,
    displayRestaurant,
    selectRouteCoordinates,
    resetDisplayedRestaurant, fetchRoute,
} from "../mapSlice";

import {selectRestaurants} from "../../restaurants/restaurantsSlice";
import MapMarker from "./MapMarker/MapMarker";
import Route from "./Route/Route";

const Map = () => {

    const dispatch = useDispatch();

    const userPosition = useSelector(selectUserPosition);
    const restaurants = useSelector(selectRestaurants);
    const displayedRestaurant = useSelector(selectDisplayedRestaurant);

    const [map, setMap] = useState(null);

    const [viewState, setViewState] = useState({
        latitude: userPosition.latitude,
        longitude: userPosition.longitude,
        zoom: 13
    });

    const handleMapMove = (e) => {
        setViewState(e.viewState);
    }

    const handleMapLoad = ({target}) => {
        setMap(target);
    }


    const handleMarkerClick = (id) => {
        if (!id) {
            throw Error("No id provided");
        }

        if (displayedRestaurant?.id !== id) {
            const restaurantToDisplay = restaurants.find(restaurant => restaurant.id === id);
            dispatch(displayRestaurant(restaurantToDisplay));
        } else {
            dispatch(resetDisplayedRestaurant());
        }
    }

    useEffect(() => {
        if (!displayedRestaurant || !userPosition) return;

        const coordinates1 = userPosition;

        const {latitude: rLat, longitude: rLon} = displayedRestaurant;
        const coordinates2 = {latitude: rLat, longitude: rLon};

        dispatch(fetchRoute({coordinates1, coordinates2}))
    }, [displayedRestaurant]);

    const routeCoordinates = useSelector(selectRouteCoordinates);

    useEffect(() => {
        if (!routeCoordinates) return;

        const routeCentre = routeCoordinates[Math.floor(routeCoordinates.length / 2)];

        map.flyTo({center: routeCentre, zoom: 13.5})
    }, [routeCoordinates]);

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

            {restaurants && restaurants.map(({id, longitude, latitude}) => (
                <MapMarker
                    key={id}
                    id={id}
                    longitude={longitude}
                    latitude={latitude}
                    type="restaurant"
                    handleClick={handleMarkerClick}
                />
            ))}

            {routeCoordinates && <Route routeCoordinates={routeCoordinates}/>}
        </ReactMapGl>
    );
};

export default Map;