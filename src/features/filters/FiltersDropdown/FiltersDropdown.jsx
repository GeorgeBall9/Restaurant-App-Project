import "./FiltersDropdown.css";
import CuisineOption from "./CuisineOption/CuisineOption";
import {faLocationArrow, faLocationCrosshairs} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useEffect, useState} from "react";

import {useSelector, useDispatch} from "react-redux";
import {selectCuisineFilter, updateCuisineFilter, resetCuisineFilter} from "../filtersSlice";
import {updateUserPosition} from "../../map/mapSlice";

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

    const cuisineFilter = useSelector(selectCuisineFilter);

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
    };

    const handleCuisineOptionClick = (name) => {
        if (name === cuisineFilter) {
            dispatch(resetCuisineFilter());
        } else {
            dispatch(updateCuisineFilter(name));
        }
    };

    const [postcode, setPostcode] = useState("");

    const handlePostCodeChange = ({target}) => setPostcode(target.value.toUpperCase());

    const handlePostcodeSubmit = ({code}) => {
        if (code !== "Enter") return;
        console.log(postcode)
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
                        <input
                            type="text"
                            placeholder="Enter postcode"
                            value={postcode}
                            onChange={handlePostCodeChange}
                            onKeyDown={handlePostcodeSubmit}
                        />
                    </label>
                </div>
            </div>

            <div className="cuisine-filters">
                <h3>Cuisine</h3>

                <div className="cuisine-options-container">
                    {cuisineOptions.map((name, i) => (
                        <CuisineOption
                            key={i}
                            name={name}
                            selected={cuisineFilter}
                            handleClick={handleCuisineOptionClick}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FiltersDropdown;