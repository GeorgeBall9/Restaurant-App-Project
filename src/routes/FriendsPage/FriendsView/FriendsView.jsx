import PendingFriendCard from "../FriendCards/PendingFriendCard/PendingFriendCard";
import ConfirmedFriendCard from "../FriendCards/ConfirmedFriendCard/ConfirmedFriendCard";

const FriendsView = ({friends, calculateMutualFriends, handleCancelClick, handleProfileClick, handleRemoveClick}) => {
    return (
        <div className="friend-icons-container">
            {[...friends]
                .sort((a, b) => {
                    if (a.status === "pending") {
                        return -1;
                    } else if (b.status === "pending") {
                        return 1;
                    } else {
                        return 0;
                    }
                })
                .map(({id, displayName, iconColour, profilePhotoUrl, status, friends: userFriends}) => {
                    if (status === "pending") {
                        return (
                            <PendingFriendCard
                                key={id}
                                displayName={displayName}
                                iconColour={iconColour}
                                profilePhotoUrl={profilePhotoUrl}
                                mutualFriends={calculateMutualFriends(userFriends)}
                                handleCancelClick={() => handleCancelClick(id)}
                            />
                        )
                    } else {
                        return (
                            <ConfirmedFriendCard
                                key={id}
                                displayName={displayName}
                                iconColour={iconColour}
                                profilePhotoUrl={profilePhotoUrl}
                                mutualFriends={calculateMutualFriends(userFriends)}
                                handleProfileClick={() => handleProfileClick(id)}
                                handleRemoveClick={() => handleRemoveClick(id)}
                            />
                        )
                    }
                })}
        </div>
    );
};

export default FriendsView;