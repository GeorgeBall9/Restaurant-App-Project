import "./RouteButton.css";
import {faCircleXmark, faRoute} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {fetchRoute, resetRoute, selectDisplayedRestaurant, selectRouteDetails} from "../../../../features/map/mapSlice";
import {selectUserPosition} from "../../../../features/location/locationSlice";
import {useDispatch, useSelector} from "react-redux";
import {activateSlider, deactivateSlider} from "../../../../features/slider/sliderSlice";
import InteractionButton from "../../InteractionButton/InteractionButton";

const RouteButton = () => {

    const dispatch = useDispatch();

    const {coordinates: routeCoordinates} = useSelector(selectRouteDetails);
    const displayedRestaurant = useSelector(selectDisplayedRestaurant);
    const userPosition = useSelector(selectUserPosition);

    const handleClick = () => {
        if (routeCoordinates) {
            dispatch(resetRoute());
            dispatch(activateSlider());
        } else {
            const coordinates1 = userPosition;

            const {latitude: rLat, longitude: rLon} = displayedRestaurant;
            const coordinates2 = {latitude: rLat, longitude: rLon};

            // fetches route from redux map slice
            dispatch(fetchRoute({coordinates1, coordinates2}));

            dispatch(deactivateSlider());
        }
    };

    return (
        <InteractionButton
            icon={faRoute}
            solidIcon={faCircleXmark}
            isSolid={routeCoordinates}
            handleClick={handleClick}
        />
    );
};

export default RouteButton;