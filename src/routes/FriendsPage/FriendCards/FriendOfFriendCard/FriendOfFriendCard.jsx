import FriendCard from "../FriendCard/FriendCard";

const FriendOfFriendCard = ({displayName, iconColour, profilePhotoUrl, mutualFriends, handleAddClick}) => {
    return (
        <FriendCard
            displayName={displayName}
            iconColour={iconColour}
            profilePhotoUrl={profilePhotoUrl}
            mutualFriends={mutualFriends}
            status="friendOfFriend"
            handleAddClick={handleAddClick}
        />
    );
};

export default FriendOfFriendCard;