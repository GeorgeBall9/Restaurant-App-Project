import "./FriendInfo.css";
import UserIcon from "../../../../common/components/UserIcon/UserIcon";
import Button from "../../../../common/components/Button/Button";

const FriendInfo = ({displayName, iconColour, profilePhotoUrl, mutualFriends, status, handleCancelClick}) => {

    return (
        <div className="friend-info">
            <UserIcon
                size="larger"
                colour={iconColour}
                skeleton={!iconColour && !profilePhotoUrl}
                imageUrl={profilePhotoUrl}
            />

            <div className="info-container">
                <h3>{displayName}</h3>

                <p>{mutualFriends} mutual friend{mutualFriends !== 1 ? "s" : ""}</p>

                {status === "pending" && (
                    <Button
                        className="cancel-request-button"
                        handleClick={handleCancelClick}
                        text="Cancel request"
                        size="small"
                    />
                )}
            </div>
        </div>
    );
};

export default FriendInfo;