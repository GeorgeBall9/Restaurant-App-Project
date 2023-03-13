import Map from "../../features/map/Map/Map";

import {useSelector} from "react-redux";
import {selectRestaurants} from "../../features/restaurants/restaurantsSlice";

const MapView = () => {

    const restaurants = useSelector(selectRestaurants);

    return (
        <div className="mapview-container">

            <Map restaurants={restaurants}/>
        </div>
    );
};

export default MapView;