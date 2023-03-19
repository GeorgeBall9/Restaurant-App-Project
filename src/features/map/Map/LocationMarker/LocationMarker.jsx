import "./LocationMarker.css";
import {Marker, Popup} from "react-map-gl";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLocationArrow} from "@fortawesome/free-solid-svg-icons";
import React from "react";

const LocationMarker = ({longitude, latitude}) => {
    return (
        <>
            <Marker
                longitude={longitude}
                latitude={latitude}
                anchor="bottom"
            >
                <FontAwesomeIcon className="location-marker-icon" icon={faLocationArrow}/>
            </Marker>

            {/*<Popup*/}
            {/*    longitude={longitude}*/}
            {/*    latitude={latitude}*/}
            {/*    anchor="bottom"*/}
            {/*    closeButton={false}*/}
            {/*    offset={50}*/}
            {/*    className="user-location-popup"*/}
            {/*>*/}
            {/*    You are here*/}
            {/*</Popup>*/}
        </>
    );
};

export default LocationMarker;