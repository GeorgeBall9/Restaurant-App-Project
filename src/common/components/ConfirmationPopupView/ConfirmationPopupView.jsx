import "./ConfirmationPopupView.css";
import PrimaryButton from "../ButtonViews/PrimaryButton/PrimaryButton";
import InversePrimaryButton from "../ButtonViews/InversePrimaryButton/InversePrimaryButton";
import Overlay from "../Overlay/Overlay";

const ConfirmationPopupView = ({message, handleYesClick, handleNoClick}) => {
    return (
        <>
            <div className="confirmation-popup">
                <p>{message}</p>

                <div className="buttons-container">
                    <PrimaryButton text="Yes" handleClick={handleYesClick}/>

                    <InversePrimaryButton
                        text="No"
                        handleClick={handleNoClick}
                    />
                </div>
            </div>

            <Overlay/>
        </>
    );
};

export default ConfirmationPopupView;