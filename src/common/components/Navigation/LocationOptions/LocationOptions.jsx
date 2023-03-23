import "./LocationOptions.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLocationArrow, faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import {toggleLocationOptions, updateUserPosition} from "../../../../features/location/locationSlice";
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

        dispatch(toggleLocationOptions());
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

        dispatch(toggleLocationOptions());
    };

    return (
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
    );
};

export default LocationOptions;