/*
 Description: Friend card component. This component is rendered in the FriendsPage component.
 Author: Ryan Henzell-Hill
 Contact: ryan.henzell-hill@outlook.com
 */
// stylesheet
import "./FriendCard.css";
// Import dependencies
import FriendInfo from "../FriendInfo/FriendInfo";
import PrimaryButton from "../../../../common/components/buttons/PrimaryButton/PrimaryButton";
import InversePrimaryButton from "../../../../common/components/buttons/InversePrimaryButton/InversePrimaryButton";

const FriendCard = ({
                        displayName,
                        iconColour,
                        profilePhotoUrl,
                        mutualFriends,
                        status,
                        button1Handler,
                        button1Text,
                        button2Handler,
                        button2Text,
                        handleCancelClick,
                        handleAddClick
                    }) => {

    return (
        <div className="friend-card">
            <FriendInfo
                displayName={displayName}
                iconColour={iconColour}
                profilePhotoUrl={profilePhotoUrl}
                mutualFriends={mutualFriends}
                status={status}
                handleCancelClick={handleCancelClick}
                handleAddClick={handleAddClick}
            />

            {(status === "confirmed" || status === "request") && (
                <div className="buttons-container">
                    <PrimaryButton handleClick={button1Handler} text={button1Text} size="small"/>
                    <InversePrimaryButton handleClick={button2Handler} text={button2Text} size="small"/>
                </div>
            )}
        </div>
    );
};

export default FriendCard;