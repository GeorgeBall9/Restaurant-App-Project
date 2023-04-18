import './DetailsNavLink.css';

const DetailsNavLink = ({active, handleClick, text}) => {
    return (
        <button className={active ? "active" : ""} onClick={() => handleClick(text)}>
            {text}
        </button>
    );
};

export default DetailsNavLink;