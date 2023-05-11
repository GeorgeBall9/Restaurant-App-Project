/*
Description: Spinner component present when fetching API data - Maps and restaurants
Author: Ryan Henzell-Hill
Contact: ryan.henzell-hill@outlook.com
*/

// stylesheet
import "./Spinner.css";

const Spinner = () => {
    return (
        <div className="spinner-overlay">
            <div className="spin-container">
                <div className="spin" id="loader"></div>
                <span id="text">Loading...</span>
            </div>
        </div>
    );
};

export default Spinner;