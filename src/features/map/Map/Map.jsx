import "./Map.css";

import ReactMapGl, {Popup} from "react-map-gl";
import {useEffect, useState} from "react";

import {useSelector, useDispatch} from "react-redux";

import {
    selectUserPosition,
    selectDisplayedRestaurant,
    displayRestaurant,
    selectRouteCoordinates,
    resetDisplayedRestaurant, fetchRoute, selectTravelTime,
} from "../mapSlice";

import {selectRestaurants} from "../../restaurants/restaurantsSlice";
import MapMarker from "./MapMarker/MapMarker";
import Route from "./Route/Route";
import {faLocationArrow, faPersonWalking, faShoePrints} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const Map = () => {

    // pull from fork test

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

        if (!displayedRestaurant) {
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
    const travelTime = Math.round(useSelector(selectTravelTime));

    useEffect(() => {
        if (!routeCoordinates) return;

        map.flyTo({zoom: 13})
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

            {!displayedRestaurant && restaurants && restaurants.map(({id, longitude, latitude}) => (
                <MapMarker
                    key={id}
                    id={id}
                    longitude={longitude}
                    latitude={latitude}
                    type="restaurant"
                    handleClick={handleMarkerClick}
                />
            ))}

            {displayedRestaurant && (
                <>
                    <MapMarker
                        key={displayedRestaurant.id}
                        id={displayedRestaurant.id}
                        longitude={displayedRestaurant.longitude}
                        latitude={displayedRestaurant.latitude}
                        type="restaurant"
                        handleClick={handleMarkerClick}
                    />
                    <Popup longitude={displayedRestaurant.longitude} latitude={displayedRestaurant.latitude}
                           anchor="bottom"
                           closeButton={false}
                           closeOnClick={false}
                           offset={50}
                    >
                        <p>{displayedRestaurant.name}</p>
                        <p>
                            <FontAwesomeIcon icon={faLocationArrow} className="icon"/>
                            {displayedRestaurant.distance} km
                        </p>
                        <p>
                            <FontAwesomeIcon icon={faPersonWalking} className="icon"/>
                            {travelTime} mins
                        </p>
                    </Popup>
                </>
            )}

            {routeCoordinates && <Route routeCoordinates={routeCoordinates}/>}
        </ReactMapGl>
    );
};

export default Map;