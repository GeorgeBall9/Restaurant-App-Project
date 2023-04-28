import "./FriendCard.css";
import FriendInfo from "./FriendInfo/FriendInfo";
import ActionButtons from "./ActionButtons/ActionButtons";

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
                        handleCancelClick
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
            />

            {status !== "pending" && (
                <ActionButtons
                    button1Handler={button1Handler}
                    button1Text={button1Text}
                    button2Handler={button2Handler}
                    button2Text={button2Text}
                />
            )}
        </div>
    );
};

export default FriendCard;