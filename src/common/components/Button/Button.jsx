import "./Button.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useEffect, useState} from "react";

const defaultStyles = {
    small: {
        padding: "0.35em 0.5em",
        fontSize: "0.9rem",
    },
    medium: {
        padding: "0.5em",
        fontSize: "1rem",
    },
    large: {
        padding: "0.75rem 1.5rem",
        fontSize: "1rem",
    }
};

const Button = ({className, handleClick, text, icon, size = "medium", active = true}) => {

    const style = defaultStyles[size];

    const clickHandler = () => {
        if (active) {
            handleClick();
        }
    };

    return (
        <button
            style={style}
            className={`default-button ${className}`}
            onClick={clickHandler}
        >
            {text}

            {icon && (
                <FontAwesomeIcon className="icon" icon={icon}/>
            )}
        </button>
    );
};

export default Button;