import "./PrimaryButton.css";
import Button from "../Button/Button";

const PrimaryButton = ({handleClick, children, text, icon, size, active, type, width, margin}) => {

    return (
        <Button
            className="primary"
            children={children}
            handleClick={handleClick}
            text={text}
            icon={icon}
            size={size}
            active={active}
            type={type}
            width={width}
            margin={margin}
        />
    );
};

export default PrimaryButton;