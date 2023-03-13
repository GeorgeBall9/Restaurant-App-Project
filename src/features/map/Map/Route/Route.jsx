import {Layer, Source} from "react-map-gl";

const Route = ({routeCoordinates}) => {

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

    return (
        <Source id="my-data" type="geojson" data={geojson}>
            <Layer {...layerStyle} />
        </Source>
    );
};

export default Route;