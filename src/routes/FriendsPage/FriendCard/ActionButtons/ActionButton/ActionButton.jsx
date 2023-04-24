import "./ActionButton.css";

const ActionButton = ({handleClick, text, className}) => {
    return <button className={"action-button " + className} onClick={handleClick}>{text}</button>;
};

export default ActionButton;