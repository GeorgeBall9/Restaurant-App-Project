import FriendRequestCard from "../FriendCards/FriendRequestCard/FriendRequestCard";

const FriendRequestsView = ({friendRequests, calculateMutualFriends, handleConfirmClick, handleDeleteClick}) => {
    return (
        <div className="friend-icons-container">
            {friendRequests.map(({id, displayName, iconColour, profilePhotoUrl, friends: userFriends}) => (
                <FriendRequestCard
                    key={id}
                    displayName={displayName}
                    iconColour={iconColour}
                    profilePhotoUrl={profilePhotoUrl}
                    mutualFriends={calculateMutualFriends(userFriends)}
                    handleConfirm={() => handleConfirmClick(id)}
                    handleDelete={() => handleDeleteClick(id)}
                />
            ))}
        </div>
    );
};

export default FriendRequestsView;