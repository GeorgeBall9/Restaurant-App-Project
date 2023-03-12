import "./Map.css";

import ReactMapGl, {Marker} from "react-map-gl";
import {useState} from "react";

const Map = ({markerPositions}) => {

    const currentPosition = {latitude: 54.9783, longitude: -1.6178};
    const {longitude, latitude} = currentPosition;

    const [viewState, setViewState] = useState({
        latitude,
        longitude,
        zoom: 14
    });

    const onMove = (e) => {
        setViewState(e.viewState);
    }

    return (
        <ReactMapGl
            {...viewState}
            style={{width: "100vw", height: "100vh"}}
            mapStyle="mapbox://styles/mapbox/streets-v12"
            onMove={onMove}
            mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        >
            <Marker longitude={currentPosition.longitude} latitude={currentPosition.latitude} anchor="bottom"></Marker>

            {markerPositions && markerPositions.map(position => (
                <Marker
                    color="#0E8388"
                    key={position.id}
                    {...position}
                    anchor="bottom"
                >
                </Marker>
            ))}
        </ReactMapGl>
    );
};

export default Map;