import "./Button.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const Button = ({className, handleClick, text, icon, size = "medium"}) => {

    const padding = {
        medium: "0.5em",
        large: "0.75rem 1.5rem"
    };

    return (
        <button
            style={{padding: padding[size]}}
            className={`default-button ${className}`}
            onClick={handleClick}
        >
            {text}

            {icon && (
                <FontAwesomeIcon className="icon" icon={icon}/>
            )}
        </button>
    );
};

export default Button;