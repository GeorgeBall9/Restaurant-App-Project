import "./FriendsOfFriend.css";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {
    acceptFriendRequest,
    cancelFriendRequest, deleteFriend,
    getFriendsByUserId,
    getUserFromUserId, rejectFriendRequest,
    sendFriendRequestToUser
} from "../../../../firebase/firebase";
import {useDispatch, useSelector} from "react-redux";
import {
    removeFriend, removeFriendRequest,
    selectDisplayedFriend, selectFriendRequests,
    selectFriends,
    selectUserId, setDisplayedFriend, setFriendRequests,
    setFriends
} from "../../../../features/user/userSlice";
import ProfileNavigationView from "../../../../common/components/ProfileNavigationView/ProfileNavigationView";
import FriendOfFriendCard from "../../FriendCards/FriendOfFriendCard/FriendOfFriendCard";
import ConfirmedFriendCard from "../../FriendCards/ConfirmedFriendCard/ConfirmedFriendCard";
import PendingFriendCard from "../../FriendCards/PendingFriendCard/PendingFriendCard";
import FriendRequestCard from "../../FriendCards/FriendRequestCard/FriendRequestCard";
import NoResults from "../../../../common/components/NoResults/NoResults";

const FriendsOfFriendsPage = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const displayedFriend = useSelector(selectDisplayedFriend);
    const currentUserId = useSelector(selectUserId);
    const currentUserFriends = useSelector(selectFriends);
    const currentUserFriendRequests = useSelector(selectFriendRequests);

    const [searchIsVisible, setSearchIsVisible] = useState(false);
    const [displayedFriends, setDisplayedFriends] = useState([]);
    const [friendsOfFriend, setFriendsOfFriend] = useState([]);

    useEffect(() => {
        if (!displayedFriend) return;

        getFriendsByUserId(displayedFriend.id)
            .then(data => {
                setFriendsOfFriend(data.filter(({id}) => id !== currentUserId))
            });
    }, [displayedFriend]);

    const handleAddFriendClick = async (id) => {
        const updatedFriends = await sendFriendRequestToUser(currentUserId, id);
        dispatch(setFriends(updatedFriends));

        // Update displayedFriends
        setDisplayedFriends(displayedFriends.map(friend => {
            if (friend.id === id) {
                return {...friend, status: "pending"};
            }

            return friend;
        }));
    };

    const calculateMutualFriends = (userFriends) => {
        let mutualFriends = 0;

        userFriends.friends?.forEach(({userId: friendId, status}) => {
            if (status === "confirmed" && currentUserFriends.some(f => f.id === friendId)) {
                mutualFriends++;
            }
        });

        return mutualFriends;
    };

    const handleSearchClick = () => {
        setSearchIsVisible(searchIsVisible => !searchIsVisible);
    };

    const getFriendOfFriendStatusForCurrentUser = (id) => {
        console.log({currentUserFriends})
        const foundFriend = currentUserFriends.find(friend => friend.id === id);
        if (foundFriend) {
            return foundFriend.status;
        }

        const foundRequest = currentUserFriendRequests.find(request => request.id === id);
        if (foundRequest) {
            return "request";
        }

        return null;
    };

    return (
        <div className="friends-of-friend-container">
            {displayedFriend && (
                <>
                    <ProfileNavigationView
                        pageTitle={`${displayedFriend.displayName}'s Friends`}
                        button2={{
                            text: searchIsVisible ? "Cancel" : "Search",
                            icon: !searchIsVisible ? faMagnifyingGlass : null,
                            handler: handleSearchClick
                        }}
                        searchFunctionality={searchIsVisible}
                    />

                    <main className="container">
                        <div className="friend-icons-container">
                            {!friendsOfFriend?.length ? (
                                <NoResults
                                    mainText="No friends found."
                                    subText={`${displayedFriend.displayName} has no friends other than you!`}
                                />
                            ) : (
                                [...friendsOfFriend]
                                    .sort((a, b) => {
                                        if (a.status === "pending") {
                                            return -1;
                                        } else if (b.status === "pending") {
                                            return 1;
                                        } else {
                                            return 0;
                                        }
                                    })
                                    .map(({id, displayName, iconColour, profilePhotoUrl, friends}) => {
                                        const status = getFriendOfFriendStatusForCurrentUser(id);

                                        if (status === "confirmed") {
                                            return (
                                                <ConfirmedFriendCard
                                                    key={id}
                                                    id={id}
                                                    displayName={displayName}
                                                    iconColour={iconColour}
                                                    profilePhotoUrl={profilePhotoUrl}
                                                    mutualFriends={calculateMutualFriends(friends)}
                                                />
                                            );
                                        } else if (status === "pending") {
                                            return (
                                                <PendingFriendCard
                                                    key={id}
                                                    id={id}
                                                    displayName={displayName}
                                                    iconColour={iconColour}
                                                    profilePhotoUrl={profilePhotoUrl}
                                                    mutualFriends={calculateMutualFriends(friends)}
                                                />
                                            );
                                        } else if (status === "request") {
                                            return (
                                                <FriendRequestCard
                                                    key={id}
                                                    id={id}
                                                    displayName={displayName}
                                                    iconColour={iconColour}
                                                    profilePhotoUrl={profilePhotoUrl}
                                                    mutualFriends={calculateMutualFriends(friends)}
                                                />
                                            );
                                        } else {
                                            return (
                                                <FriendOfFriendCard
                                                    key={id}
                                                    id={id}
                                                    displayName={displayName}
                                                    iconColour={iconColour}
                                                    profilePhotoUrl={profilePhotoUrl}
                                                    mutualFriends={calculateMutualFriends(friends)}
                                                    handleAddClick={() => handleAddFriendClick(id)}
                                                />
                                            );
                                        }
                                    })
                            )}
                        </div>
                    </main>
                </>
            )}
        </div>
    );

};

export default FriendsOfFriendsPage;