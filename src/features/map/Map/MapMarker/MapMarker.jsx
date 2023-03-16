/*
Description: MapMarker component to be displayed on Map component
Author: Ryan Henzell-Hill
Contact: ryan.henzell-hill@outlook.com
*/

// dependencies
import {Marker, Popup} from "react-map-gl";

const MapMarker = ({id, name, longitude, latitude, type, handleClick}) => {

    const anchor = "bottom";

    // return marker to indicate user position on map
    if (type === "user") {
        return (
            <>
                <Marker
                    longitude={longitude}
                    latitude={latitude}
                    anchor={anchor}
                    color="#ffb100"
                >
                </Marker>

                <Popup
                    longitude={longitude}
                    latitude={latitude}
                    anchor="bottom"
                    closeButton={false}
                    offset={50}
                    className="user-location-popup"
                >
                    You are here
                </Popup>
            </>
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