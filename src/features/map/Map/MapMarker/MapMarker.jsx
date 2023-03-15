/*
Description: MapMarker component to be displayed on Map component
Author: Ryan Henzell-Hill
Contact: ryan.henzell-hill@outlook.com
*/

// dependencies
import {Marker} from "react-map-gl";

const MapMarker = ({id, longitude, latitude, type, handleClick}) => {

    const anchor = "bottom";

    // return marker to indicate user position on map
    if (type === "user") {
        return (
            <Marker
                longitude={longitude}
                latitude={latitude}
                anchor={anchor}
                color="#ffb100"
            >
            </Marker>
        );
    }

    // return marker to indicate restaurant position on map
    return (
        <Marker
            longitude={longitude}
            latitude={latitude}
            anchor={anchor}
            color="red"
            onClick={() => handleClick(id)}
        >
        </Marker>
    );
};

export default MapMarker;