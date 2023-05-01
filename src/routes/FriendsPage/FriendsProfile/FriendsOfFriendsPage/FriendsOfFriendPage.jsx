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
    cancelFriendRequest,
    getFriendsByUserId,
    getUserFromUserId,
    sendFriendRequestToUser
} from "../../../../firebase/firebase";
import {useDispatch, useSelector} from "react-redux";
import {
    selectDisplayedFriend,
    selectFriends,
    selectUserId,
    setFriends
} from "../../../../features/user/userSlice";
import FriendCard from "../../FriendCard/FriendCard";
import {resetSearchQuery, selectSearchQuery} from "../../../../features/filters/filtersSlice";
import ProfileNavigation from "../../../../common/components/ProfileNavigation/ProfileNavigation";

const FriendsOfFriendsPage = () => {

    const dispatch = useDispatch();

    const displayedFriend = useSelector(selectDisplayedFriend);
    const currentUserId = useSelector(selectUserId);

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

    const calculateMutualFriends = (displayedFriend) => {
        let mutualFriends = 0;

        displayedFriend.friends?.forEach(({userId: friendId, status}) => {
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
                                .map(({id, displayName, iconColour, profilePhotoUrl, status, friends}) => (
                                    <FriendCard
                                        key={id}
                                        id={id}
                                        displayName={displayName}
                                        iconColour={iconColour}
                                        profilePhotoUrl={profilePhotoUrl}
                                        mutualFriends={calculateMutualFriends({id, friends})}
                                        status="friendOfFriend"
                                        handleAddClick={() => handleAddFriendClick(id)}
                                    />
                                ))}
                        </div>
                    </main>
                </>
            )}
        </div>
    );
};

export default FriendsOfFriendsPage;