import "./SecondaryButton.css";
import Button from "../Button/Button";

const SecondaryButton = ({handleClick, text, icon, size, active}) => {
    return (
        <Button
            className="secondary"
            handleClick={handleClick}
            text={text}
            icon={icon}
            size={size}
            active={active}
        />
    );
};

export default SecondaryButton;