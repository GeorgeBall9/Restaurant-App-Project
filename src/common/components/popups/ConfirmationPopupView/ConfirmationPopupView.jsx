/*
Description: Confirmation popup component
Author: Ryan Henzell-Hill
Contact: ryan.henzell-hill@outlook.com
*/

// stylesheet
import "./ConfirmationPopupView.css";

// component imports
import PrimaryButton from "../../buttons/PrimaryButton/PrimaryButton";
import InversePrimaryButton from "../../buttons/InversePrimaryButton/InversePrimaryButton";
import Overlay from "../../Overlay/Overlay";

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