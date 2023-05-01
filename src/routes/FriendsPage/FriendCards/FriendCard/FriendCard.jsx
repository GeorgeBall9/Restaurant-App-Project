import "./FriendCard.css";
import FriendInfo from "../FriendInfo/FriendInfo";
import PrimaryButton from "../../../../common/components/PrimaryButton/PrimaryButton";
import InversePrimaryButton from "../../../../common/components/InversePrimaryButton/InversePrimaryButton";

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

            {status === "confirmed" && (
                <div className="buttons-container">
                    <PrimaryButton handleClick={button1Handler} text={button1Text} size="small"/>
                    <InversePrimaryButton handleClick={button2Handler} text={button2Text} size="small"/>
                </div>
            )}
        </div>
    );
};

export default FriendCard;