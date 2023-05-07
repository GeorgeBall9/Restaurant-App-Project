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

    const dispatch = useDispatch();

    const displayedFriend = useSelector(selectDisplayedFriend);
    const currentUserId = useSelector(selectUserId);
    const currentUserFriends = useSelector(selectFriends);
    const currentUserFriendRequests = useSelector(selectFriendRequests);

    const [friendsOfFriend, setFriendsOfFriend] = useState([]);
    const [displayedFriends, setDisplayedFriends] = useState([]);
    const [searchIsVisible, setSearchIsVisible] = useState(false);
    const [searchHasMatches, setSearchHasMatches] = useState(true);

    useEffect(() => {
        if (!displayedFriend) return;

        getFriendsByUserId(displayedFriend.id)
            .then(data => {
                setFriendsOfFriend(data.filter(({id}) => id !== currentUserId))
            });
    }, [displayedFriend]);

    useEffect(() => {
        if (!friendsOfFriend?.length) return;

        setDisplayedFriend(friendsOfFriend);
    }, [friendsOfFriend]);

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
        setDisplayedFriends(friendsOfFriend);
        setSearchIsVisible(searchIsVisible => !searchIsVisible);
    };

    const handleSearchInputChange = (query) => {
        const lowerCaseQuery = query.toLowerCase();

        const searchResults = displayedFriends
            .filter(({displayName}) => displayName.toLowerCase().includes(lowerCaseQuery));

        if (searchResults.length) {
            setDisplayedFriends(searchResults);
            setSearchHasMatches(true);
        } else {
            console.log("no results")
            setDisplayedFriends(friendsOfFriend);
            setSearchHasMatches(false);
        }
    };

    const getFriendOfFriendStatusForCurrentUser = (id) => {
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
                        handleSearchInputChange={handleSearchInputChange}
                        searchFunctionality={searchIsVisible}
                        hasMatches={searchHasMatches}
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