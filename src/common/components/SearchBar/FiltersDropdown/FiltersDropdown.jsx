import "./FiltersDropdown.css";
import CuisineOption from "./CuisineOption/CuisineOption";

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
            <h3>Cuisine</h3>

            <div className="cuisine-options-container">
                {cuisineOptions.map(name => (
                    <CuisineOption name={name}/>
                ))}
            </div>
        </div>
    );
};

export default FiltersDropdown;