import "./SecondaryButton.css";
import Button from "../Button/Button";

const SecondaryButton = ({handleClick, text, icon, size, active, type}) => {
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