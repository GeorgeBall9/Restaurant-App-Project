import FriendCard from "../FriendCard/FriendCard";

const PendingFriendCard = ({displayName, iconColour, profilePhotoUrl, mutualFriends, handleCancelClick}) => {
    return (
        <FriendCard
            displayName={displayName}
            iconColour={iconColour}
            profilePhotoUrl={profilePhotoUrl}
            mutualFriends={mutualFriends}
            status="pending"
            handleCancelClick={handleCancelClick}
        />
    );
};

export default PendingFriendCard;