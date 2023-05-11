/*
Description: Overlay component for use when any popup is displayed to make content below unclickable
Author: Ryan Henzell-Hill
Contact: ryan.henzell-hill@outlook.com
*/

// stylesheet
import "./Overlay.css";

const Overlay = ({handleClick}) => {
    return <div className="overlay" onClick={handleClick}></div>;
};

export default Overlay;