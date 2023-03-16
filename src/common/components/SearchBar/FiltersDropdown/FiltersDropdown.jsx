import "./FiltersDropdown.css";
import CuisineOption from "./CuisineOption/CuisineOption";
import {faClock, faLocationArrow, faLocationCrosshairs, faSignsPost} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

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
    return (
        <div className="filters-dropdown">
            <div className="location-filters">
                <h3>Location</h3>

                <div className="location-options-container">
                    <button className="use-geolocation-button">
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