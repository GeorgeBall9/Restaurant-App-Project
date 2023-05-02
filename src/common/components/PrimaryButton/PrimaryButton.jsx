import "./PrimaryButton.css";
import Button from "../Button/Button";

const PrimaryButton = ({handleClick, text, icon, size, active, type}) => {
    return (
        <Button
            className="primary"
            handleClick={handleClick}
            text={text}
            icon={icon}
            size={size}
            active={active}
            type={type}
        />
    );
};

export default PrimaryButton;