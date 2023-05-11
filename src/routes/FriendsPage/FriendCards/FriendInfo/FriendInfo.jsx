/*
 Description: Friend info component. This component is rendered in the FriendCard component.
 Author: Ryan Henzell-Hill
 Contact: ryan.henzell-hill@outlook.com
 */

 // stylesheet
import "./FriendInfo.css";
// Import dependencies
import UserIcon from "../../../../common/components/UserIcon/UserIcon";
import SecondaryButton from "../../../../common/components/buttons/SecondaryButton/SecondaryButton";
import PrimaryButton from "../../../../common/components/buttons/PrimaryButton/PrimaryButton";

const FriendInfo = ({
                        displayName,
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