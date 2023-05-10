/*
Description: Generic button component for use throughout application
Author: Ryan Henzell-Hill
Contact: ryan.henzell-hill@outlook.com
*/

// stylesheet
import "./PrimaryButton.css";

// import generic button component
import Button from "../Button/Button";

// PrimaryButton component
const PrimaryButton = ({handleClick, children, text, icon, size, active, type, width, margin}) => {

    // Render the generic Button component with specific props
    return (
        <Button
            className="primary"
            children={children}
            handleClick={handleClick}
            text={text}
            icon={icon}
            size={size}
            active={active}
            type={type}
            width={width}
            margin={margin}
        />
    );
};

export default PrimaryButton;