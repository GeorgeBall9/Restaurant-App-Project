import "./SecondaryButton.css";
import Button from "../Button/Button";

const SecondaryButton = ({handleClick, text, icon, size}) => {
    return (
        <Button className="secondary" handleClick={handleClick} text={text} icon={icon} size={size}/>
    );
};

export default SecondaryButton;