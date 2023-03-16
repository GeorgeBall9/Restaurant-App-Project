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

    useEffect(() => {
        console.log(cuisineFilter)
    }, [cuisineFilter]);

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