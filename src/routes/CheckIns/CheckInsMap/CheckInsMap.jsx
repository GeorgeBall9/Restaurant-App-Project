import "./CheckInsMap.css";
import {useDispatch, useSelector} from "react-redux";
import {selectUserPosition} from "../../../features/location/locationSlice";
import {useEffect, useState} from "react";
import {hideSpinner, showSpinner} from "../../../features/spinner/spinnerSlice";
import ReactMapGl, {FullscreenControl} from "react-map-gl";
import {Popup} from "react-map-gl";
import RestaurantMarker from "../../../features/map/Map/RestaurantMarker/RestaurantMarker";
import {Link} from "react-router-dom";
import {faArrowUpRightFromSquare} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {selectDisplayedRestaurant} from "../../../features/map/mapSlice";

const CheckInsMap = ({checkIns, onViewDetails}) => {

    const dispatch = useDispatch();

    // select all relevant information from map slice
    const userPosition = useSelector(selectUserPosition);
    const displayedRestaurant = useSelector(selectDisplayedRestaurant);

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
                style={{width: "100%", height: "260px"}}
                mapStyle="mapbox://styles/mapbox/streets-v12"
                onMove={handleMapMove}
                onLoad={handleMapLoad}
                mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                onRender={({target}) => target.resize()}
            >

                {checkIns && checkIns
                    .map(({id, restaurant, date, friendData}) => {
                        const {id: restaurantId, longitude, latitude, name} = restaurant;

                        return (
                            <div key={id}>
                                <RestaurantMarker
                                    restaurant={{...restaurant, checkInId: id}}
                                    visible={true}
                                    type="check-ins"
                                />

                                {displayedRestaurant?.id === restaurantId && (
                                    <Popup
                                        longitude={longitude}
                                        latitude={latitude}
                                        anchor="bottom"
                                        closeButton={false}
                                        closeOnClick={false}
                                        offset={45}
                                    >
                                        <div className="content">
                                            <h3>{name}</h3>

                                            {/*{friendData.length > 0 && (*/}
                                            {/*    <p>*/}
                                            {/*        With {friendData.map(friend => friend.displayName).join(", ")}*/}
                                            {/*    </p>*/}
                                            {/*)}*/}

                                            <button onClick={onViewDetails}>View details</button>
                                        </div>
                                    </Popup>
                                )}
                            </div>
                        )
                    })}

                <FullscreenControl position="bottom-right"/>
            </ReactMapGl>
        </div>
    );
};

export default CheckInsMap;