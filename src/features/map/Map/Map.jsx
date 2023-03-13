import "./Map.css";

import ReactMapGl, {Marker} from "react-map-gl";
import {useState} from "react";

import {useSelector, useDispatch} from "react-redux";

import {
    selectUserPosition,
    selectRestaurantPositions,
    selectDisplayedRestaurant,
    displayRestaurant,
} from "../mapSlice";

const Map = () => {

    const dispatch = useDispatch();

    const restaurantPositions = useSelector(selectRestaurantPositions);
    const userPosition = useSelector(selectUserPosition);
    const displayedRestaurant = useSelector(selectDisplayedRestaurant);

    const [viewState, setViewState] = useState({
        latitude: userPosition.latitude,
        longitude: userPosition.longitude,
        zoom: 14
    });

    const handleMapMove = (e) => {
        setViewState(e.viewState);
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

    return (
        <ReactMapGl
            {...viewState}
            style={{width: "100vw", height: "100vh"}}
            mapStyle="mapbox://styles/mapbox/streets-v12"
            onMove={handleMapMove}
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
        </ReactMapGl>
    );
};

export default Map;