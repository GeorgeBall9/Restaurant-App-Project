import "./ErrorPopupView.css";
import PrimaryButton from "../buttons/PrimaryButton/PrimaryButton";

const ErrorPopupView = ({title, message, children, closePopup}) => {
    return (
        <div className="error-popup">
            {title && <p className="title">{title}</p>}

            {message && <p className="message">{message}</p>}

            {children}

            <PrimaryButton text="Close" handleClick={closePopup}/>
        </div>
    );
};

export default ErrorPopupView;