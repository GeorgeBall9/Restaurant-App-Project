const ActionButton = ({handleClick, text}) => {
    return <button onClick={handleClick}>{text}</button>;
};

export default ActionButton;