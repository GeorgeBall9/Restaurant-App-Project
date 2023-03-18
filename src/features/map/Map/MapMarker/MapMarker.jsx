/*
Description: MapMarker component to be displayed on Map component
Author: Ryan Henzell-Hill
Contact: ryan.henzell-hill@outlook.com
*/

// dependencies
import {Marker, Popup} from "react-map-gl";

import locationMarkerImgSrc from "../../../../common/images/location2.png";
import restaurantMarkerImgSrc from "../../../../common/images/restaurant4.png";

const MapMarker = ({id, longitude, latitude, type, handleClick, selected}) => {

    const anchor = "bottom";

    // return marker to indicate user position on map
    if (type === "user") {
        return (
            <>
                <Marker
                    longitude={longitude}
                    latitude={latitude}
                    anchor={anchor}
                >
                    <img
                        className="location-marker"
                        src={locationMarkerImgSrc}
                    />
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
        >
            <div>
                <img
                    className={`restaurant-marker ${selected ? "selected" : ""}`}
                    src={restaurantMarkerImgSrc}
                    onClick={() => handleClick(id)}
                />
            </div>
        </Marker>
    );
};

export default MapMarker;