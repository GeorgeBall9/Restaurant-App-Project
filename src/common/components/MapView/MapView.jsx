import "./MapView.css";
import ReactMapGl from "react-map-gl";
import {useEffect, useState} from "react";
import {hideSpinner, showSpinner} from "../../../features/spinner/spinnerSlice";
import {useDispatch, useSelector} from "react-redux";
import {selectUserPosition} from "../../../features/location/locationSlice";
import MainMapChildren from "../../../routes/MapPage/MainMapChildren/MainMapChildren";
import {selectDisplayedRestaurant} from "../../../features/map/mapSlice";
import mapboxgl from "mapbox-gl";

// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

const MapView = ({zoom, height, view}) => {

    const dispatch = useDispatch();

    const userPosition = useSelector(selectUserPosition);
    const displayedRestaurant = useSelector(selectDisplayedRestaurant);

    const [map, setMap] = useState(null);

    const [viewState, setViewState] = useState({
        longitude: userPosition.longitude,
        latitude: userPosition.latitude,
        zoom
    });

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
    const handleMapLoad = ({target}) => setMap(target);

    // fly to new marker if user updates their position
    useEffect(() => {
        if (!userPosition || !map) return;

        const {longitude, latitude} = userPosition;

        requestAnimationFrame(() => {
            map.flyTo({
                center: [longitude, latitude],
                essential: true,
                speed: 0.5,
                zoom: 14
            });
        });
    }, [userPosition]);

    useEffect(() => {
        if (!displayedRestaurant || !map) return;

        const {longitude, latitude} = displayedRestaurant;

        requestAnimationFrame(() => {
            map.flyTo({center: [longitude, latitude], essential: true, speed: 0.5});
        });
    }, [displayedRestaurant]);

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
                {view === "main" && <MainMapChildren/>}
            </ReactMapGl>
        </div>
    );
};

export default MapView;