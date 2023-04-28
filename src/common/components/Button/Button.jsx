import "./Button.css";

const Button = ({className, handleClick, text}) => {
    return (
        <button className={`button ${className}`} onClick={handleClick}>{text}</button>
    );
};

export default Button;