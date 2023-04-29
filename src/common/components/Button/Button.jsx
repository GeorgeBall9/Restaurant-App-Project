import "./Button.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const Button = ({className, handleClick, text, icon, size = "medium"}) => {

    const style = {
        small: {
            padding: "0.5em 0.5em",
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

    return (
        <button
            style={style[size]}
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