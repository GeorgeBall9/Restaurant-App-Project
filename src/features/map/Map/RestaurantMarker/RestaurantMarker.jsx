import "./RestaurantMarker.css";
import {Marker} from "react-map-gl";
import {displayRestaurant} from "../../mapSlice";
import {setActiveSlide} from "../../../slider/sliderSlice";
import {useDispatch} from "react-redux";

const RestaurantMarker = ({restaurant, index, selected, visible, type = "main"}) => {

    const {id, name, longitude, latitude, photoUrl} = restaurant;

    const dispatch = useDispatch();

    const style = {
        visibility: visible ? "visible" : "hidden",
        zIndex: selected ? 10 : 0,
    };

    // handler function to display the restaurant associated with the marker that is clicked by the user
    const handleClick = (id) => {
        if (!id) {
            throw new Error("No id provided");
        }

        if (type === "check-in") {
            dispatch(displayRestaurant(restaurant));
        } else {
            dispatch(displayRestaurant(restaurant));
            dispatch(setActiveSlide(index));
        }
    };

    return (
        <Marker
            longitude={longitude}
            latitude={latitude}
            anchor="bottom"
            style={style}
        >
            <div
                className={`restaurant-marker-container ${selected ? "selected" : ""} ${type}`}
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

export default RestaurantMarker;