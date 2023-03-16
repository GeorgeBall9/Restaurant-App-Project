import "./FiltersDropdown.css";
import CuisineOption from "./CuisineOption/CuisineOption";
import {faLocationArrow, faLocationCrosshairs} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useDispatch} from "react-redux";
import {updateUserPosition} from "../../../../features/map/mapSlice";

const cuisineOptions = [
    "Any",
    "British",
    "Chinese",
    "European",
    "Burger",
    "Indian",
    "Italian",
    "Japanese",
    "Mexican",
    "Pizza",
    "Pub",
    "Bar",
    "Spanish",
    "Steak",
    "Sushi",
    "Thai"
]

const FiltersDropdown = () => {

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
    }

    return (
        <div className="filters-dropdown">
            <div className="location-filters">
                <h3>Location</h3>

                <div className="location-options-container">
                    <button className="use-geolocation-button" onClick={handleUseLocationClick}>
                        <FontAwesomeIcon icon={faLocationCrosshairs} className="icon"/>
                        Use location
                    </button>

                    <label className="postcode-input-container">
                        <FontAwesomeIcon icon={faLocationArrow} className="icon"/>
                        <input type="text" placeholder="Enter postcode"/>
                    </label>
                </div>
            </div>

            <div className="cuisine-filters">
                <h3>Cuisine</h3>

                <div className="cuisine-options-container">
                    {cuisineOptions.map((name, i) => (
                        <CuisineOption key={i} name={name}/>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FiltersDropdown;