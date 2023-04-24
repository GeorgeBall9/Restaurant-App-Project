import "./ActionButtons.css";
import ActionButton from "./ActionButton/ActionButton";

const ActionButtons = ({button1Text, button1Handler, button2Text, button2Handler}) => {
    return (
        <div className="buttons-container">
            <ActionButton handleClick={button1Handler} text={button1Text}/>
            <ActionButton handleClick={button2Handler} text={button2Text}/>
        </div>
    );
};

export default ActionButtons;