import "./RouteButton.css";
import {faRoute} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {fetchRoute, selectDisplayedRestaurant} from "../../../../features/map/mapSlice";
import {selectUserPosition} from "../../../../features/location/locationSlice";
import {useDispatch, useSelector} from "react-redux";

const RouteButton = () => {

    const dispatch = useDispatch();

    const displayedRestaurant = useSelector(selectDisplayedRestaurant);
    const userPosition = useSelector(selectUserPosition);

    const handleClick = () => {
        if (!displayedRestaurant) return;

        const coordinates1 = userPosition;

        const {latitude: rLat, longitude: rLon} = displayedRestaurant;
        const coordinates2 = {latitude: rLat, longitude: rLon};

        // fetches route from redux map slice
        dispatch(fetchRoute({coordinates1, coordinates2}));
    };

    return (
        <FontAwesomeIcon icon={faRoute} className="icon" onClick={handleClick}/>
    );
};

export default RouteButton;