import "./CheckInsMap.css";
import {useDispatch, useSelector} from "react-redux";
import {selectUserPosition} from "../../../features/location/locationSlice";
import {useEffect, useState} from "react";
import {hideSpinner, showSpinner} from "../../../features/spinner/spinnerSlice";
import ReactMapGl from "react-map-gl";
import LocationMarker from "../../../features/map/Map/LocationMarker/LocationMarker";
import RestaurantMarker from "../../../features/map/Map/RestaurantMarker/RestaurantMarker";

const CheckInsMap = ({restaurants}) => {

    const dispatch = useDispatch();

    // select all relevant information from map slice
    const userPosition = useSelector(selectUserPosition);

    const [map, setMap] = useState(null);

    // view state of map - will change as user moves the map
    const [viewState, setViewState] = useState({
        latitude: userPosition.latitude,
        longitude: userPosition.longitude,
        zoom: 13.5
    });

    // handler functions
    // handler function to change the view state when the user moves the map
    const handleMapMove = (e) => setViewState(e.viewState);

    // handler function to set the map held in the component state to the map when it is loaded
    const handleMapLoad = ({target}) => {
        setMap(target);
    };

    // fly to new marker if user updates their position
    useEffect(() => {
        if (!userPosition || !map) return;

        const {longitude, latitude} = userPosition;
        map.flyTo({center: [longitude, latitude], zoom: 14});
    }, [userPosition]);

    useEffect(() => {
        if (!map) {
            dispatch(showSpinner());
        } else {
            dispatch(hideSpinner());
        }
    }, [map]);

    // useEffect(() => {
    //     if (!displayedRestaurant || !map) return;
    //
    //     const {longitude, latitude} = displayedRestaurant;
    //
    //     requestAnimationFrame(() => {
    //         map.flyTo({center: [longitude, latitude], essential: true, speed: 0.5});
    //     });
    // },[displayedRestaurant]);

    // component returned to MapPage route
    return (
        <div className="map-container">
            <ReactMapGl
                {...viewState}
                style={{width: "100%", height: "220px"}}
                mapStyle="mapbox://styles/mapbox/streets-v12"
                onMove={handleMapMove}
                onLoad={handleMapLoad}
                mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                onRender={({target}) => target.resize()}
            >

                {restaurants && restaurants
                    .map((restaurant, index) => (
                        <RestaurantMarker
                            key={restaurant.id + "" + index}
                            restaurant={restaurant}
                            index={index}
                            visible={true}
                        />
                    ))}
            </ReactMapGl>
        </div>
    );
};

export default CheckInsMap;