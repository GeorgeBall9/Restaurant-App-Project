import "./ActionButton.css";

const ActionButton = ({handleClick, text}) => {
    return <button className="action-button" onClick={handleClick}>{text}</button>;
};

export default ActionButton;