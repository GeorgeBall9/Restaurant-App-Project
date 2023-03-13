import {Marker} from "react-map-gl";

const MapMarker = ({id, longitude, latitude, type, handleClick}) => {

    const anchor = "bottom";

    if (type === "user") {
        return (
            <Marker
                longitude={longitude}
                latitude={latitude}
                anchor={anchor}
                color="red"
            >
            </Marker>
        );
    }

    return (
        <Marker
            longitude={longitude}
            latitude={latitude}
            anchor={anchor}
            color="#0E8388"
            onClick={() => handleClick(id)}
        >
        </Marker>
    );
};

export default MapMarker;