import "./CheckInsMap.css";
import {useDispatch, useSelector} from "react-redux";
import {selectUserPosition} from "../../../features/location/locationSlice";
import {useEffect, useState} from "react";
import {hideSpinner, showSpinner} from "../../../features/spinner/spinnerSlice";
import ReactMapGl, {FullscreenControl} from "react-map-gl";
import {Popup} from "react-map-gl";
import RestaurantMarker from "../../../features/map/Map/RestaurantMarker/RestaurantMarker";
import {Link} from "react-router-dom";
import {faArrowUpRightFromSquare, faLocationArrow} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {selectDisplayedRestaurant} from "../../../features/map/mapSlice";
import {selectUserId} from "../../../features/user/userSlice";

const CheckInsMap = ({restaurants}) => {

    const dispatch = useDispatch();

    // select all relevant information from map slice
    const userId = useSelector(selectUserId);
    const userPosition = useSelector(selectUserPosition);
    const displayedRestaurant = useSelector(selectDisplayedRestaurant);

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

    useEffect(() => {
        if (!displayedRestaurant || !map) return;

        const {longitude, latitude} = displayedRestaurant;

        requestAnimationFrame(() => {
            map.flyTo({center: [longitude, latitude], essential: true, speed: 0.5});
        });
    }, [displayedRestaurant]);

    // component returned to MapPage route
    return (
        <div id="check-ins-map" className="map-container check-ins-map">
            <ReactMapGl
                {...viewState}
                style={{width: "100%", height: "240px"}}
                mapStyle="mapbox://styles/mapbox/streets-v12"
                onMove={handleMapMove}
                onLoad={handleMapLoad}
                mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                onRender={({target}) => target.resize()}
            >

                {restaurants && restaurants
                    .map((restaurant, index) => (
                        <div key={restaurant.id + "" + index}>
                            <RestaurantMarker
                                restaurant={restaurant}
                                index={index}
                                visible={true}
                                type="check-ins"
                            />

                            {displayedRestaurant?.id === restaurant.id && (
                                <Popup longitude={restaurant.longitude} latitude={restaurant.latitude}
                                       anchor="bottom"
                                       closeButton={false}
                                       closeOnClick={false}
                                       offset={50}
                                >
                                    <div className="content">
                                        <Link to={`/details/${restaurant.id}`}>
                                            <h3>
                                                {restaurant.name}
                                                <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="icon"/>
                                            </h3>
                                        </Link>

                                        <p>Visited on {new Date(restaurant.date).toLocaleDateString()}</p>

                                        <div>
                                            <button>Edit</button>
                                            <button>Delete</button>
                                        </div>
                                    </div>
                                </Popup>
                            )}
                        </div>
                    ))}

                <FullscreenControl position="bottom-right"/>
            </ReactMapGl>
        </div>
    );
};

export default CheckInsMap;