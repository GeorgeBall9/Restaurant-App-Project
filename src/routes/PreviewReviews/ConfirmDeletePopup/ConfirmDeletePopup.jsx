import "./ConfirmDeletePopup.css";

const ConfirmDeletePopup = ({handleConfirmDelete, handleCancelDelete}) => {
    return (
        <div className="confirm-delete-popup">
            <p>Delete this review?</p>

            <div className="buttons-container">
                <button onClick={handleConfirmDelete}>Yes</button>
                <button onClick={handleCancelDelete}>No</button>
            </div>
        </div>
    );
};

export default ConfirmDeletePopup;