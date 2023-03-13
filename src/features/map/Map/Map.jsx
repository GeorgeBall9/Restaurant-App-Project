import "./Map.css";

import ReactMapGl, {Layer, Marker, Source} from "react-map-gl";
import {useEffect, useState} from "react";

import {useSelector, useDispatch} from "react-redux";

import {
    selectUserPosition,
    selectDisplayedRestaurant,
    displayRestaurant, selectRouteCoordinates, resetDisplayedRestaurant, setRouteCoordinates
} from "../mapSlice";

const Map = ({restaurants}) => {

    const dispatch = useDispatch();

    const userPosition = useSelector(selectUserPosition);
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

        const restaurantToDisplay = restaurants.find(restaurant => restaurant.id === id);
        dispatch(displayRestaurant(restaurantToDisplay));

        // if (displayedRestaurant?.id !== id) {
        //     const restaurantToDisplay = restaurants.find(restaurant => restaurant.id === id);
        //     dispatch(displayRestaurant(restaurantToDisplay));
        // } else {
        //     dispatch(resetDisplayedRestaurant);
        // }
    }

    useEffect(() => {
        if (!displayedRestaurant || !userPosition) return;

        const {latitude: uLat, longitude: uLon} = userPosition;
        const {latitude: rLat, longitude: rLon} = displayedRestaurant;

        const query = "https://api.mapbox.com/directions/v5/mapbox/walking/" +
            uLon + "," + uLat + ";" + rLon + "," + rLat +
            "?alternatives=true&continue_straight=true&geometries=geojson&language=en&overview=simplified&steps=true&" +
            "access_token=" + process.env.REACT_APP_MAPBOX_TOKEN;

        fetch(query)
            .then(response => {
                if (!response.ok) {
                    throw Error("The requested resource is not available");
                }

                return response.json();
            })
            .then(data => {
                dispatch(setRouteCoordinates(data.routes[0].geometry.coordinates));
            })
    }, [displayedRestaurant]);

    const routeCoordinates = useSelector(selectRouteCoordinates);

    const geojson = {
        "type": "FeatureCollection",
        "features": [
            {
                "type": "Feature",
                "geometry": {
                    "type": "LineString",
                    "coordinates": routeCoordinates
                }
            }
        ]
    };

    const layerStyle = {
        id: 'lineLayer',
        type: 'line',
        layout: {
            "line-join": "round",
            "line-cap": "round"
        },
        paint: {
            "line-color": "rgba(3, 170, 238, 0.5)",
            "line-width": 5
        }
    };

    useEffect(() => {
        if (!displayedRestaurant || !routeCoordinates) return;

        // const routeCentre = routeCoordinates[Math.floor(routeCoordinates.length / 2)];

        map.flyTo({zoom: 13.5})
    }, [displayedRestaurant, routeCoordinates]);

    return (
        <ReactMapGl
            {...viewState}
            style={{width: "100vw", height: "100vh"}}
            mapStyle="mapbox://styles/mapbox/streets-v12"
            onMove={handleMapMove}
            onLoad={handleMapLoad}
            mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        >
            <Marker longitude={userPosition.longitude} latitude={userPosition.latitude} color="red" anchor="bottom"></Marker>

            {restaurants && restaurants.map(restaurant => (
                <Marker
                    color="#0E8388"
                    key={restaurant.id}
                    latitude={restaurant.latitude}
                    longitude={restaurant.longitude}
                    onClick={() => handleMarkerClick(restaurant.id)}
                    anchor="bottom"
                >
                </Marker>
            ))}

            {displayedRestaurant && routeCoordinates && <Source id="my-data" type="geojson" data={geojson}>
                <Layer {...layerStyle} />
            </Source>}
        </ReactMapGl>
    );
};

export default Map;