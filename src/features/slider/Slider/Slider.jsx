import "./Slider.css";
import RestaurantsList from "../../restaurants/RestaurantsList/RestaurantsList";

const Slider = () => {

    const handleBackClick = () => {
        console.log("back")
    };

    const handleNextClick = () => {
        console.log("next")
    };

    return (
        <div className="slider">
            <div className="buttons-container">
                <button onClick={handleBackClick}>Back</button>
                <button onClick={handleNextClick}>Next</button>
            </div>

            <div className="restaurant-cards-container">
                <RestaurantsList/>
            </div>
        </div>
    );
};

export default Slider;