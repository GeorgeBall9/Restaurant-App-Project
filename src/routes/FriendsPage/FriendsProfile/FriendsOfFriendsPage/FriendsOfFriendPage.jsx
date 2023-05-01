import "./FriendsOfFriend.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faArrowLeft, faCircleCheck, faLink,
    faMagnifyingGlass, faPlus,
} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";
import SearchBox from "../../../../common/components/SearchBox/SearchBox";
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
import FriendCard from "../../FriendCards/FriendCard/FriendCard";
import {resetSearchQuery, selectSearchQuery} from "../../../../features/filters/filtersSlice";
import ProfileNavigation from "../../../../common/components/ProfileNavigation/ProfileNavigation";
import FriendOfFriendCard from "../../FriendCards/FriendOfFriendCard/FriendOfFriendCard";
import ConfirmedFriendCard from "../../FriendCards/ConfirmedFriendCard/ConfirmedFriendCard";
import PendingFriendCard from "../../FriendCards/PendingFriendCard/PendingFriendCard";
import FriendRequestCard from "../../FriendCards/FriendRequestCard/FriendRequestCard";

const FriendsOfFriendsPage = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const displayedFriend = useSelector(selectDisplayedFriend);
    const currentUserId = useSelector(selectUserId);
    const currentUserFriends = useSelector(selectFriends);
    const currentUserFriendRequests = useSelector(selectFriendRequests);

    const friends = useSelector(selectFriends);
    const searchQuery = useSelector(selectSearchQuery);

    const [searchIsVisible, setSearchIsVisible] = useState(false);
    const [display, setDisplay] = useState("friends");
    const [addFriendId, setAddFriendId] = useState("");
    const [addFriendFeedback, setAddFriendFeedback] = useState("");
    const [displayedFriends, setDisplayedFriends] = useState([]);
    const [hasMatches, setHasMatches] = useState(false);

    const [friendsOfFriend, setFriendsOfFriend] = useState([]);

    useEffect(() => {
        if (!displayedFriend) return;

        getFriendsByUserId(displayedFriend.id)
            .then(friends => setFriendsOfFriend(friends.filter(friend => friend.id !== currentUserId)));
    }, [displayedFriend]);

    useEffect(() => {
        if (display === "friends" && !friendsOfFriend) return;

        if (!searchQuery) {
            if (display === "friends") {
                setDisplayedFriends(friendsOfFriend);
            }
            return;
        }

        const query = searchQuery.toLowerCase();

        let searchResults;

        if (display === "friends") {
            searchResults = friendsOfFriend.filter(({displayName}) => displayName.toLowerCase().includes(query));
        }

        if (!searchResults.length) {
            setHasMatches(false);

            if (display === "friends") {
                setDisplayedFriends(friendsOfFriend);
            }

        } else {
            if (display === "friends") {
                setDisplayedFriends(searchResults);
            }
            setHasMatches(true);
        }
    }, [searchQuery, friendsOfFriend]);

    const handleAddFriendClick = async (id) => {
        const updatedFriends = await sendFriendRequestToUser(currentUserId, id);
        dispatch(setFriends(updatedFriends));
        setAddFriendId("");

        // Update displayedFriends
        setDisplayedFriends(displayedFriends.map(friend => {
            if (friend.id === id) {
                return {...friend, status: "pending"};
            }
            return friend;
        }));
    };

    const handleCancelClick = async (id) => {
        const updatedFriends = await cancelFriendRequest(currentUserId, id);
        dispatch(setFriends(updatedFriends));
    };

    const handleProfileClick = async (userId) => {
        const friendData = await getUserFromUserId(userId);
        dispatch(setDisplayedFriend(friendData))
        navigate(`/view-profile/${userId}`);
    };

    const handleRemoveClick = async (id) => {
        console.log("show remove friend confirmation popup");
        await deleteFriend(currentUserId, id);
        dispatch(removeFriend(id));
    };

    const handleConfirmClick = async (id) => {
        console.log("confirm friend");
        const updatedFriends = await acceptFriendRequest(currentUserId, id);
        dispatch(setFriends(updatedFriends));
        dispatch(removeFriendRequest(id));
        console.log("friend request accepted");
    };

    const handleDeleteClick = async (id) => {
        console.log("delete friend request");
        const updatedRequests = await rejectFriendRequest(currentUserId, id);
        dispatch(setFriendRequests(updatedRequests));
        console.log("friend request deleted");
    };

    const calculateMutualFriends = (userFriends) => {
        let mutualFriends = 0;

        userFriends.friends?.forEach(({userId: friendId, status}) => {
            if (status === "confirmed" && friends.some(f => f.id === friendId)) {
                mutualFriends++;
            }
        });

        return mutualFriends;
    };

    const handleSearchClick = () => {
        dispatch(resetSearchQuery());
        setSearchIsVisible(searchIsVisible => !searchIsVisible);
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
                    <ProfileNavigation
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
                            {displayedFriends && [...displayedFriends]
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
                                                displayName={displayName}
                                                iconColour={iconColour}
                                                profilePhotoUrl={profilePhotoUrl}
                                                mutualFriends={calculateMutualFriends(friends)}
                                                handleProfileClick={() => handleProfileClick(id)}
                                                handleRemoveClick={() => handleRemoveClick(id)}
                                            />
                                        );
                                    } else if (status === "pending") {
                                        return (
                                            <PendingFriendCard
                                                key={id}
                                                displayName={displayName}
                                                iconColour={iconColour}
                                                profilePhotoUrl={profilePhotoUrl}
                                                mutualFriends={calculateMutualFriends(friends)}
                                                handleCancelClick={() => handleCancelClick(id)}
                                            />
                                        );
                                    } else if (status === "request") {
                                        return (
                                            <FriendRequestCard
                                                key={id}
                                                displayName={displayName}
                                                iconColour={iconColour}
                                                profilePhotoUrl={profilePhotoUrl}
                                                mutualFriends={calculateMutualFriends(friends)}
                                                handleConfirm={() => handleConfirmClick(id)}
                                                handleDelete={() => handleDeleteClick(id)}
                                            />
                                        );
                                    } else {
                                        return (
                                            <FriendOfFriendCard
                                                key={id}
                                                displayName={displayName}
                                                iconColour={iconColour}
                                                profilePhotoUrl={profilePhotoUrl}
                                                mutualFriends={calculateMutualFriends(friends)}
                                                handleAddClick={() => handleAddFriendClick(id)}
                                            />
                                        );
                                    }
                                })}
                        </div>
                    </main>
                </>
            )}
        </div>
    );
};

export default FriendsOfFriendsPage;