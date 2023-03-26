import "./RouteButton.css";
import {faCircleXmark, faRoute} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {fetchRoute, resetRoute, selectDisplayedRestaurant, selectRouteDetails} from "../../../../features/map/mapSlice";
import {selectUserPosition} from "../../../../features/location/locationSlice";
import {useDispatch, useSelector} from "react-redux";
import {activateSlider, deactivateSlider} from "../../../../features/slider/sliderSlice";

const RouteButton = () => {

    const dispatch = useDispatch();

    const {coordinates: routeCoordinates} = useSelector(selectRouteDetails);
    const displayedRestaurant = useSelector(selectDisplayedRestaurant);
    const userPosition = useSelector(selectUserPosition);

    const handleRouteClick = () => {
        const coordinates1 = userPosition;

        const {latitude: rLat, longitude: rLon} = displayedRestaurant;
        const coordinates2 = {latitude: rLat, longitude: rLon};

        // fetches route from redux map slice
        dispatch(fetchRoute({coordinates1, coordinates2}));

        dispatch(deactivateSlider());
    };

    const handleCloseClick = () => {
        dispatch(resetRoute());
        dispatch(activateSlider());
    };

    return (
        <>
            {!routeCoordinates && <FontAwesomeIcon icon={faRoute} className="icon" onClick={handleRouteClick}/>}
            {routeCoordinates && <FontAwesomeIcon icon={faCircleXmark} className="icon" onClick={handleCloseClick}/>}
        </>
    );
};

export default RouteButton;