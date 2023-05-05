import "./LocationOptions.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLocationArrow, faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import {
    selectUsingCurrentLocation, setLocationDescription, setUsingCurrentLocation, setUsingCustomLocation,
    toggleLocationOptions,
    updateUserPosition,
} from "../../locationSlice";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {hideSpinner, showSpinner} from "../../../spinner/spinnerSlice";
import PrimaryButton from "../../../../common/components/PrimaryButton/PrimaryButton";
import FormField from "../../../../common/components/FormField/FormField";

const LocationOptions = () => {

    const dispatch = useDispatch();

    const usingCurrentLocation = useSelector(selectUsingCurrentLocation);

    const [postcode, setPostcode] = useState("");
    const [showErrorPopup, setShowErrorPopup] = useState(false);
    const [errorFeedback, setErrorFeedback] = useState({title: "", message: ""});

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
            updateErrorFeedback("gps");
            setShowErrorPopup(true);
        }

        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(success, error);
        } else {
            console.log("location not available")
        }
    };

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
                dispatch(setLocationDescription(postcode));
            })
            .catch(error => {
                console.error(error);
                dispatch(hideSpinner());
                updateErrorFeedback("postcode");
                setShowErrorPopup(true);
            });
    };

    const closeErrorPopup = () => {
        setShowErrorPopup(false);
    };

    return (
        <div className="location-options-container">
            <div className="location-options">
                {showErrorPopup && (
                    <div className="location-error-popup">
                        <p className="location-error-title">{errorFeedback.title}</p>

                        <p className="location-error-message">{errorFeedback.message}</p>

                        <PrimaryButton text="Close" handleClick={closeErrorPopup}/>
                    </div>
                )}

                <label className="postcode-input-container">
                    <FontAwesomeIcon icon={faMagnifyingGlass} className="icon"/>

                    <FormField
                        type="text"
                        placeholder="Enter postcode"
                        value={postcode}
                        onChangeHandler={handlePostCodeChange}
                        onKeyDown={handlePostcodeSubmit}
                        padding="0"
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
