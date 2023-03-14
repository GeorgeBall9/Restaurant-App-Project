import {Layer, Popup, Source} from "react-map-gl";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLocationArrow, faPersonWalking} from "@fortawesome/free-solid-svg-icons";

const Route = ({displayedRestaurant, routeCoordinates, travelTime}) => {

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

    const layerStyle = {
        id: 'lineLayer',
        type: 'line',
        layout: {
            "line-join": "round",
            "line-cap": "round"
        },
        paint: {
            "line-color": "rgba(3, 170, 238, 0.5)",
            "line-width": 5
        }
    };

    const {name, longitude, latitude, distance} = displayedRestaurant;

    return (
        <>
            <Popup longitude={longitude} latitude={latitude}
                   anchor="bottom"
                   closeButton={false}
                   closeOnClick={false}
                   offset={50}
            >
                <p>{name}</p>
                <p>
                    <FontAwesomeIcon icon={faLocationArrow} className="icon"/>
                    {distance} km
                </p>
                <p>
                    <FontAwesomeIcon icon={faPersonWalking} className="icon"/>
                    {Math.round(travelTime)} mins
                </p>
            </Popup>

            <Source id="my-data" type="geojson" data={geojson}>
                <Layer {...layerStyle} />
            </Source>
        </>
    );
};

export default Route;