/*
Description: Primary button component built off generic Button component for use throughout application
Author: Ryan Henzell-Hill
Contact: ryan.henzell-hill@outlook.com
*/

// stylesheet
import "./SecondaryButton.css";

// import generic button component
import Button from "../Button/Button";

// SecondaryButton component
const SecondaryButton = ({handleClick, text, icon, size, active, type}) => {

    // Render the generic Button component with specific props
    return (
        <Button
            className="secondary"
            handleClick={handleClick}
            text={text}
            icon={icon}
            size={size}
            active={active}
            type={type}
        />
    );
};

export default SecondaryButton;