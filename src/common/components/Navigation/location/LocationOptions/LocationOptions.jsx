import "./LocationOptions.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLocationArrow, faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import {
    selectUsingCurrentLocation,
    setLocationDescription,
    setUsingCurrentLocation,
    setUsingCustomLocation,
    updateUserPosition
} from "../../../../../features/location/locationSlice";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {hideSpinner, showSpinner} from "../../../../../features/spinner/spinnerSlice";
import ErrorPopupView from "../../../ErrorPopupView/ErrorPopupView";

const LocationOptions = ({closePopup}) => {

    const dispatch = useDispatch();

    const usingCurrentLocation = useSelector(selectUsingCurrentLocation);

    const [postcode, setPostcode] = useState("");
    const [showErrorPopup, setShowErrorPopup] = useState(false);
    const [errorFeedback, setErrorFeedback] = useState({title: "", message: ""});
    const {title, message} = errorFeedback;
    const [inputPlaceholder, setInputPlaceholder] = useState("Enter postcode");

    const handleInputFocus = () => {
        setInputPlaceholder("");
    };

    const handleInputBlur = () => {
        if (!postcode) {
            setInputPlaceholder("Enter postcode");
        }
    };

    const updateLocalStorageValue = (name, value) => {
        localStorage.setItem(name, JSON.stringify(value));
    };

    const saveLocationDetails = (longitude, latitude, description) => {
        updateLocalStorageValue("longitude", longitude);
        updateLocalStorageValue("latitude", latitude);
        updateLocalStorageValue("locationDescription", description);

        if (description === "Current location") {
            updateLocalStorageValue(usingCurrentLocation, true);
        } else {
            updateLocalStorageValue(usingCurrentLocation, false);
        }
    };

    const updateErrorFeedback = (type) => {
        const newTitle = type === "postcode" ?
            "Unable to find results for that postcode."
            :
            "Unable to retrieve your location.";

        const newMessage = type === "postcode" ?
            "Please make sure the postcode you entered is correct."
            :
            "Please try again or enter a postcode manually.";

        setErrorFeedback(errorFeedback => {
            const updatedFeedback = {...errorFeedback};
            updatedFeedback.title = newTitle;
            updatedFeedback.message = newMessage;
            return updatedFeedback;
        });
    };

    const handleUseLocationClick = () => {
        if (usingCurrentLocation) {
            closePopup();
            return;
        }

        dispatch(showSpinner());

        const success = (position) => {
            const {longitude, latitude} = position.coords;
            dispatch(updateUserPosition({latitude, longitude}));
            dispatch(setUsingCurrentLocation());
            saveLocationDetails(longitude, latitude, "Current location");
            closePopup();
        };

        const error = (error) => {
            console.error(error);
            dispatch(hideSpinner());
            updateErrorFeedback("gps");
            setShowErrorPopup(true);
        };

        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(success, error);
        } else {
            console.log("location not available");
        }
    };

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
                dispatch(setLocationDescription(postcode));
                saveLocationDetails(longitude, latitude, postcode);
                closePopup();
            })
            .catch(error => {
                console.error(error);
                dispatch(hideSpinner());
                updateErrorFeedback("postcode");
                setShowErrorPopup(true);
            });
    };

    return (
        <div className="location-options-container">
            <div className="location-options">
                {showErrorPopup && (
                    <ErrorPopupView
                        title={title}
                        message={message}
                        closePopup={closePopup}
                    />
                )}

                <label className="postcode-input-container">
                    <FontAwesomeIcon icon={faMagnifyingGlass} className="icon"/>

                    <input
                        type="text"
                        placeholder={inputPlaceholder}
                        value={postcode}
                        onChange={({target}) => setPostcode(target.value.toUpperCase())}
                        onKeyDown={handlePostcodeSubmit}
                        onFocus={handleInputFocus}
                        onBlur={handleInputBlur}
                        style={{padding: "0"}} // Set padding to 0
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
