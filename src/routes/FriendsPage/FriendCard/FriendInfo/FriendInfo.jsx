import "./FriendInfo.css";
import UserIcon from "../../../../common/components/UserIcon/UserIcon";
import SecondaryButton from "../../../../common/components/SecondaryButton/SecondaryButton";
import PrimaryButton from "../../../../common/components/PrimaryButton/PrimaryButton";

const FriendInfo = ({
                        displayName,
                        iconColour,
                        profilePhotoUrl,
                        mutualFriends,
                        status,
                        handleCancelClick,
                        handleAddClick
                    }) => {

    return (
        <div className="friend-info">
            <UserIcon
                size="larger"
                colour={iconColour}
                skeleton={!iconColour && !profilePhotoUrl}
                imageUrl={profilePhotoUrl}
            />

            <div>
                <div className="info-container">
                    <h3>{displayName}</h3>

                    <p>{mutualFriends} mutual friend{mutualFriends !== 1 ? "s" : ""}</p>
                </div>

                {status === "pending" && (
                    <SecondaryButton
                        handleClick={handleCancelClick}
                        text="Cancel request"
                        size="small"
                    />
                )}

                {status === "friendOfFriend" && (
                    <PrimaryButton
                        handleClick={handleAddClick}
                        text="Add friend"
                        size="small"
                    />
                )}
            </div>
        </div>
    );
};

export default FriendInfo;