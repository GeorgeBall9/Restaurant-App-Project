import "./PrimaryButton.css";
import Button from "../Button/Button";

const PrimaryButton = ({handleClick, text}) => {
    return (
        <Button className="primary" handleClick={handleClick} text={text}/>
    );
};

export default PrimaryButton;