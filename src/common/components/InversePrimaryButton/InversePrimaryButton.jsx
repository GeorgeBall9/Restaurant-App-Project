import "./InversePrimaryButton.css";
import Button from "../Button/Button";

const InversePrimaryButton = ({handleClick, text, icon, size, active, type}) => {
    return (
        <Button
            className="inverse-primary"
            handleClick={handleClick}
            text={text}
            icon={icon}
            size={size}
            active={active}
            type={type}
        />
    );
};

export default InversePrimaryButton;