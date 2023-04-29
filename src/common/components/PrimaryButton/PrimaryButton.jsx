import "./PrimaryButton.css";
import Button from "../Button/Button";

const PrimaryButton = ({handleClick, text, icon, size}) => {
    return (
        <Button className="primary" handleClick={handleClick} text={text} icon={icon} size={size}/>
    );
};

export default PrimaryButton;