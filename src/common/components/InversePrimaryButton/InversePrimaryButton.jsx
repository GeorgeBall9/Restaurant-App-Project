import "./InversePrimaryButton.css";
import Button from "../Button/Button";

const InversePrimaryButton = ({handleClick, text, icon, size, active}) => {
    return (
        <Button
            className="inverse-primary"
            handleClick={handleClick}
            text={text}
            icon={icon}
            size={size}
            active={active}
        />
    );
};

export default InversePrimaryButton;