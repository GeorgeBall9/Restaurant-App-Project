import "./SecondaryButton.css";
import Button from "../components/Button/Button";

const SecondaryButton = ({handleClick, text}) => {
    return (
        <Button className="secondary" handleClick={handleClick} text={text}/>
    );
};

export default SecondaryButton;