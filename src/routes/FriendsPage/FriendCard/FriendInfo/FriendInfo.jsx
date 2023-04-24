import "./FriendInfo.css";
import UserIcon from "../../../../common/components/UserIcon/UserIcon";
import ActionButton from "../ActionButtons/ActionButton/ActionButton";

const FriendInfo = ({iconColour, displayName, mutualFriends, status, handleCancelClick}) => {

    return (
        <div className="friend-info">
            <UserIcon size="larger" colour={iconColour}/>

            <div className="info-container">
                <h3>{displayName}</h3>
                <p>{mutualFriends} mutual friend{mutualFriends !== 1 ? "s" : ""}</p>

                {status === "pending" && (
                    <ActionButton
                        handleClick={handleCancelClick}
                        text="Cancel request"
                        className="cancel-request-button"
                    />
                )}
            </div>
        </div>
    );
};

export default FriendInfo;