import "./Map.css";

import ReactMapGl, {Layer, Marker, Source} from "react-map-gl";
import {useEffect, useState} from "react";

import {useSelector, useDispatch} from "react-redux";

import {
    selectUserPosition,
    selectRestaurantPositions,
    selectDisplayedRestaurant,
    displayRestaurant, selectRouteCoordinates,
} from "../mapSlice";

const Map = () => {

    const dispatch = useDispatch();

    const restaurantPositions = useSelector(selectRestaurantPositions);
    const userPosition = useSelector(selectUserPosition);
    const displayedRestaurant = useSelector(selectDisplayedRestaurant);

    const [map, setMap] = useState(null);

    const [viewState, setViewState] = useState({
        latitude: userPosition.latitude,
        longitude: userPosition.longitude,
        zoom: 14
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

        const restaurantToDisplay = {
            id: 6,
            name: "Aneesa's Buffet Restaurant",
            latitude: 54.970577,
            longitude: -1.602858,
            photoUrl: "https://media-cdn.tripadvisor.com/media/photo-m/1280/1a/25/56/e5/our-food.jpg",
            distance: 0.16737098518519444,
            rating: 4.5,
            price: "£16 - £18",
            cuisine: [
                {
                    "key": "10346",
                    "name": "Indian"
                }
            ]
        };

        dispatch(displayRestaurant(restaurantToDisplay));
    }

    // useEffect(() => {
    //     if (!displayedRestaurant || !userPosition) return;
    //
    //     const {latitude: uLat, longitude: uLon} = userPosition;
    //     const {latitude: rLat, longitude: rLon} = displayedRestaurant;
    //
    //     const query = "https://api.mapbox.com/directions/v5/mapbox/walking/" +
    //         uLon + "," + uLat + ";" + rLon + "," + rLat +
    //         "?alternatives=true&continue_straight=true&geometries=geojson&language=en&overview=simplified&steps=true&" +
    //         "access_token=pk.eyJ1IjoicnloaGlsbDE5OTgiLCJhIjoiY2xmNGRvcXd0MGpzOTN0b2Nkenl5cGtxayJ9.tRUD5Dr7vNkkb3l5qDLK-Q";
    //
    //     console.log(query)
    //     fetch(query)
    //         .then(response => {
    //             if (!response.ok) {
    //                 throw Error("The requested resource is not available");
    //             }
    //
    //             return response.json();
    //         })
    //         .then(data => {
    //             setRouteCoordinates(data.routes[0].geometry.coordinates);
    //             console.log(data.routes[0].geometry.coordinates)
    //         })
    // }, [displayedRestaurant]);
    //
    // const [routeCoordinates, setRouteCoordinates] = useState(null);

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

        const routeCentre = routeCoordinates[routeCoordinates.length / 2];

        map.flyTo({center: routeCentre, zoom: 14.5})
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
            <Marker longitude={userPosition.longitude} latitude={userPosition.latitude} anchor="bottom"></Marker>

            {!displayedRestaurant && restaurantPositions && restaurantPositions.map(position => (
                <Marker
                    color="#0E8388"
                    key={position.id}
                    {...position}
                    onClick={() => handleMarkerClick(position.id)}
                    anchor="bottom"
                >
                </Marker>
            ))}

            {displayedRestaurant && (
                <Marker
                    color="#0E8388"
                    key={displayedRestaurant.id}
                    latitude={displayedRestaurant.latitude}
                    longitude={displayedRestaurant.longitude}
                    onClick={() => handleMarkerClick(displayedRestaurant.id)}
                    anchor="bottom"
                >
                </Marker>
            )}

            {displayedRestaurant && routeCoordinates && <Source id="my-data" type="geojson" data={geojson}>
                <Layer {...layerStyle} />
            </Source>}
        </ReactMapGl>
    );
};

export default Map;