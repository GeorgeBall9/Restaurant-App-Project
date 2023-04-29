import "./InversePrimaryButton.css";
import Button from "../Button/Button";

const InversePrimaryButton = ({handleClick, text, icon, size}) => {
    return (
        <Button className="inverse-primary" handleClick={handleClick} text={text} icon={icon} size={size}/>
    );
};

export default InversePrimaryButton;