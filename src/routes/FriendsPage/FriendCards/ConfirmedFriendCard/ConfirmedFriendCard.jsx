import FriendCard from "../FriendCard/FriendCard";

const ConfirmedFriendCard = ({
                                 displayName,
                                 iconColour,
                                 profilePhotoUrl,
                                 mutualFriends,
                                 handleProfileClick,
                                 handleRemoveClick
                             }) => {
    return (
        <FriendCard
            displayName={displayName}
            iconColour={iconColour}
            profilePhotoUrl={profilePhotoUrl}
            mutualFriends={mutualFriends}
            status="confirmed"
            button1Handler={handleProfileClick}
            button1Text="Profile"
            button2Handler={handleRemoveClick}
            button2Text="Remove"
        />
    );
};

export default ConfirmedFriendCard;