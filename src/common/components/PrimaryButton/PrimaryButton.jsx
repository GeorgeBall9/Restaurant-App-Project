import "./PrimaryButton.css";
import Button from "../Button/Button";

const PrimaryButton = ({handleClick, text, icon, size, active}) => {
    return (
        <Button
            className="primary"
            handleClick={handleClick}
            text={text}
            icon={icon}
            size={size}
            active={active}
        />
    );
};

export default PrimaryButton;