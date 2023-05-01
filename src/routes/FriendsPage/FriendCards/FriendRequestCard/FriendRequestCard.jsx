import FriendCard from "../FriendCard/FriendCard";

const FriendRequestCard = ({displayName, iconColour, profilePhotoUrl, mutualFriends, handleConfirm, handleDelete}) => {
    return (
        <FriendCard
            displayName={displayName}
            iconColour={iconColour}
            profilePhotoUrl={profilePhotoUrl}
            mutualFriends={mutualFriends}
            button1Handler={handleConfirm}
            button1Text="Confirm"
            button2Handler={handleDelete}
            button2Text="Delete"
        />
    );
};

export default FriendRequestCard;