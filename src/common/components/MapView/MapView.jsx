import "./MapView.css";
import ReactMapGl from "react-map-gl";
import {useEffect, useState} from "react";
import {hideSpinner, showSpinner} from "../../../features/spinner/spinnerSlice";
import {useDispatch, useSelector} from "react-redux";
import {selectUserPosition} from "../../../features/location/locationSlice";
import MainMapChildren from "../../../routes/MapPage/MainMapChildren/MainMapChildren";
import {selectDisplayedRestaurant} from "../../../features/map/mapSlice";
import mapboxgl from "mapbox-gl";
import CheckInsMapChildren from "../../../routes/CheckIns/CheckInsMapChildren/CheckInsMapChildren";
import {selectRestaurantsFetchStatus} from "../../../features/restaurants/restaurantsSlice";

// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

const MapView = ({centrePosition, zoom, height, restaurants, checkIns, handleLoad}) => {

    const dispatch = useDispatch();

    const displayedRestaurant = useSelector(selectDisplayedRestaurant);
    const restaurantsFetchStatus = useSelector(selectRestaurantsFetchStatus);

    const [map, setMap] = useState(null);

    const [viewState, setViewState] = useState({
        longitude: centrePosition.longitude,
        latitude: centrePosition.latitude,
        zoom
    });

    useEffect(() => {
        if (restaurantsFetchStatus === "pending") {
            dispatch(showSpinner());
        } else if (restaurantsFetchStatus === "idle" && map) {
            dispatch(hideSpinner());
        }
    }, [restaurantsFetchStatus, map]);

    useEffect(() => {
        if (!map) {
            dispatch(showSpinner());
        } else {
            dispatch(hideSpinner());
        }
    }, [map]);

    // handler functions
    // handler function to change the view state when the user moves the map
    const handleMapMove = (e) => setViewState(e.viewState);

    // handler function to set the map held in the component state to the map when it is loaded
    const handleMapLoad = ({target}) => {
        setMap(target);

        if (!handleLoad) return;

        handleLoad();
    }

    useEffect(() => {
        if (!displayedRestaurant || !map) return;

        const {longitude, latitude} = displayedRestaurant;

        map.flyTo({center: [longitude, latitude], essential: true, speed: 0.5});
    }, [displayedRestaurant]);

    // fly to new marker if user updates their position
    useEffect(() => {
        if (!centrePosition || !map) return;

        const {longitude, latitude} = centrePosition;

        map.flyTo({
            center: [longitude, latitude],
            essential: true,
            speed: 0.75,
            zoom
        });
    }, [centrePosition, map]);

    return (
        <div className="map-container">
            <ReactMapGl
                {...viewState}
                style={{width: "100%", height}}
                mapStyle="mapbox://styles/mapbox/streets-v12"
                onMove={handleMapMove}
                onLoad={handleMapLoad}
                mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                onRender={({target}) => target.resize()}
            >
                {map && restaurants && (
                    <MainMapChildren
                        userPosition={centrePosition}
                        restaurants={restaurants}
                        displayedRestaurant={displayedRestaurant}
                    />
                )}

                {map && checkIns && (
                    <CheckInsMapChildren checkIns={checkIns} displayedRestaurant={displayedRestaurant}/>
                )}
            </ReactMapGl>
        </div>
    );
};

export default MapView;