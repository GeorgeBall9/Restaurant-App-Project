/*
Description: MapMarker component to be displayed on Map component
Author: Ryan Henzell-Hill
Contact: ryan.henzell-hill@outlook.com
*/

// dependencies
import {Marker, Popup} from "react-map-gl";

import {faLocationArrow} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React from "react";

// TODO - change this component to two separate components: userMarker and restaurantMarker

const MapMarker = ({id, name, photoUrl, longitude, latitude, type, handleClick, selected, visibile}) => {

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
                    <FontAwesomeIcon className="location-marker-icon" icon={faLocationArrow}/>
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

    const style = {visibility: visibile ? "visible" : "hidden"};

    // return marker to indicate restaurant position on map
    return (
        <Marker
            longitude={longitude}
            latitude={latitude}
            anchor={anchor}
            style={style}
        >

            <div
                className={`restaurant-marker-container ${selected ? "selected" : ""}`}
                onClick={() => handleClick(id)}
            >
                <div className="marker">
                    <img src={photoUrl} alt={`${name} marker`}/>
                </div>

                <div className="triangle"></div>
            </div>
        </Marker>
    );
};

export default MapMarker;