import "./LocationOptions.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLocationArrow, faLocationCrosshairs} from "@fortawesome/free-solid-svg-icons";
import {resetDisplayedRestaurant, updateUserPosition} from "../../../map/mapSlice";
import {toggleFiltersDropdown} from "../../filtersSlice";
import {useDispatch} from "react-redux";
import {useState} from "react";

const LocationOptions = () => {

    const dispatch = useDispatch();

    const handleUseLocationClick = () => {
        const success = (position) => {
            const {longitude, latitude} = position.coords;
            dispatch(updateUserPosition({latitude, longitude}));
        };

        const error = (error) => {
            console.error(error);
        }

        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(success, error);
        } else {
            console.log("location not available")
        }

        dispatch(resetDisplayedRestaurant());
        dispatch(toggleFiltersDropdown());
    };

    const [postcode, setPostcode] = useState("");

    const handlePostCodeChange = ({target}) => setPostcode(target.value.toUpperCase());

    const handlePostcodeSubmit = ({code}) => {
        if (code !== "Enter") return;

        fetch("https://api.postcodes.io/postcodes/" + postcode)
            .then(response => {
                if (!response.ok) {
                    throw new Error("The requested resource is not available.");
                }

                return response.json();
            })
            .then(data => {
                const {longitude, latitude} = data.result;
                dispatch(updateUserPosition({longitude, latitude}));
            })
            .catch(error => console.error(error));

        dispatch(resetDisplayedRestaurant());
        dispatch(toggleFiltersDropdown());
    };

    return (
        <div className="location-options-container">
            <button className="use-geolocation-button" onClick={handleUseLocationClick}>
                <FontAwesomeIcon icon={faLocationCrosshairs} className="icon"/>
                Use location
            </button>

            <label className="postcode-input-container">
                <FontAwesomeIcon icon={faLocationArrow} className="icon"/>
                <input
                    type="text"
                    placeholder="Enter postcode"
                    value={postcode}
                    onChange={handlePostCodeChange}
                    onKeyDown={handlePostcodeSubmit}
                />
            </label>
        </div>
    );
};

export default LocationOptions;