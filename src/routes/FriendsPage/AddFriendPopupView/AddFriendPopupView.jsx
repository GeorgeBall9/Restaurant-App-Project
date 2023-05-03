import FormField from "../../../common/components/FormField/FormField";
import PrimaryButton from "../../../common/components/PrimaryButton/PrimaryButton";
import SecondaryButton from "../../../common/components/SecondaryButton/SecondaryButton";
import {useState} from "react";

const AddFriendPopupView = ({feedback, foundUser, handleFindUserClick, handleNoClick, sendFriendRequest}) => {

    const [addFriendId, setAddFriendId] = useState("");

    const handleYesClick = () => {
        sendFriendRequest(addFriendId);
        setAddFriendId("");
    };

    return (
        <div className="confirm-checkin-popup">
            {feedback && (
                <p className="feedback">{feedback}</p>
            )}

            <div className="date-container">
                <FormField
                    label="Friend ID"
                    name="visitDate"
                    type="text"
                    value={addFriendId}
                    onChangeHandler={({target}) => setAddFriendId(target.value)}
                />
            </div>

            {foundUser && (
                <p>Send friend request to <span>{foundUser.displayName}</span>?</p>
            )}

            {!foundUser && (
                <div className="buttons-container">
                    <PrimaryButton handleClick={() => handleFindUserClick(addFriendId)} text="Find user"/>
                    <SecondaryButton handleClick={handleNoClick} text="Cancel"/>
                </div>
            )}

            {foundUser && (
                <div className="buttons-container">
                    <PrimaryButton handleClick={handleYesClick} text="Yes"/>
                    <SecondaryButton handleClick={handleNoClick} text="No"/>
                </div>
            )}
        </div>
    );
};

export default AddFriendPopupView;