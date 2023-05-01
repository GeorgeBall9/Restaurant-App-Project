/*
Description: Route component to be displayed on Map component - consists of route between markers and a popup
Author: Ryan Henzell-Hill
Contact: ryan.henzell-hill@outlook.com
*/

// dependencies
import {Layer, Popup, Source} from "react-map-gl";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLocationArrow, faPersonWalking} from "@fortawesome/free-solid-svg-icons";

const Route = ({displayedRestaurant, routeCoordinates, travelTime}) => {

    // geojson configuration
    const geojson = {
        "type": "FeatureCollection",
        "features": [
            {
                "type": "Feature",
                "geometry": {
                    "type": "LineString",
                    "coordinates": routeCoordinates
                }
            }
        ]
    };

    // layer style configuration
    const layerStyle = {
        id: 'lineLayer',
        type: 'line',
        layout: {
            "line-join": "round",
            "line-cap": "round"
        },
        paint: {
            "line-color": "rgba(244, 157, 26, 0.8)",
            "line-width": 5
        }
    };

    // deconstruct properties from displayedRestaurant object
    const {longitude, latitude, distance} = displayedRestaurant;

    return (
        <>
            <Popup
                longitude={longitude}
                latitude={latitude}
                anchor="bottom"
                closeButton={false}
                closeOnClick={false}
                offset={50}
            >
                <div className="content">
                    <p>
                        <FontAwesomeIcon icon={faLocationArrow} className="icon"/>
                        {Math.round(distance * 10) / 10} km
                    </p>

                    <p>
                        <FontAwesomeIcon icon={faPersonWalking} className="icon"/>
                        {Math.round(travelTime)} mins
                    </p>
                </div>
            </Popup>

            <Source id="my-data" type="geojson" data={geojson}>
                <Layer {...layerStyle} />
            </Source>
        </>
    );
};

export default Route;