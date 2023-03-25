import "./LocationOptions.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLocationArrow, faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import {
    selectUsingCurrentLocation, setUsingCurrentLocation, setUsingCustomLocation,
    toggleLocationOptions,
    updateUserPosition,
} from "../locationSlice";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {hideSpinner, showSpinner} from "../../spinner/spinnerSlice";

const LocationOptions = () => {

    const dispatch = useDispatch();

    const usingCurrentLocation = useSelector(selectUsingCurrentLocation);

    const handleUseLocationClick = () => {
        if (usingCurrentLocation) {
            dispatch(toggleLocationOptions());
            return;
        }

        dispatch(showSpinner());

        const success = (position) => {
            const {longitude, latitude} = position.coords;
            dispatch(updateUserPosition({latitude, longitude}));
            dispatch(setUsingCurrentLocation());
        };

        const error = (error) => {
            console.error(error);
            dispatch(hideSpinner());
        }

        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(success, error);
        } else {
            console.log("location not available")
        }

        dispatch(toggleLocationOptions());
    };

    const [postcode, setPostcode] = useState("");

    const handlePostCodeChange = ({target}) => setPostcode(target.value.toUpperCase());

    const handlePostcodeSubmit = ({code}) => {
        if (code !== "Enter") return;

        dispatch(showSpinner());

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
                dispatch(setUsingCustomLocation());
            })
            .catch(error => {
                console.error(error);
                dispatch(hideSpinner());
            });

        dispatch(toggleLocationOptions());
    };

    return (
        <div className="location-options-container">
            <div className="location-options">
                <label className="postcode-input-container">
                    <FontAwesomeIcon icon={faMagnifyingGlass} className="icon"/>

                    <input
                        type="text"
                        placeholder="Enter postcode"
                        value={postcode}
                        onChange={handlePostCodeChange}
                        onKeyDown={handlePostcodeSubmit}
                    />
                </label>

                <button className="use-geolocation-button" onClick={handleUseLocationClick}>
                    <FontAwesomeIcon icon={faLocationArrow} className="icon"/>
                    Current location
                </button>
            </div>
        </div>
    );
};

export default LocationOptions;