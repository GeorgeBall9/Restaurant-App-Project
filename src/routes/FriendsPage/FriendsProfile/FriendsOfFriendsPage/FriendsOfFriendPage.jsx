import "../../FriendsPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowLeft, faChevronDown,
    faCircleCheck,
    faCirclePlus,
    faLink,
    faMagnifyingGlass,
    faPlus
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import UserIcon from "../../../../common/components/UserIcon/UserIcon";
import SearchBox from "../../../../common/components/SearchBox/SearchBox";
import { useEffect, useState } from "react";
import FormField from "../../../../common/components/FormField/FormField";
import {
    acceptFriendRequest, cancelFriendRequest, deleteFriend,
    getFriendRequestsByUserId,
    getFriendsByUserId,
    getUserFromUserId, rejectFriendRequest,
    sendFriendRequestToUser
} from "../../../../firebase/firebase";
import { useDispatch, useSelector } from "react-redux";
import {
    removeFriend,
    removeFriendRequest,
    selectFriendRequests, selectFriendRequestsSortFilter,
    selectFriends, selectFriendsSortFilter,
    selectUserId,
    setFriendRequests,
    setFriends
} from "../../../../features/user/userSlice";
import LinkButton from "../../LinkButton/LinkButton";
import FriendInfo from "../../FriendCard/FriendInfo/FriendInfo";
import ActionButtons from "../../FriendCard/ActionButtons/ActionButtons";
import FriendCard from "../../FriendCard/FriendCard";
import { hideOverlay, showOverlay } from "../../../../features/overlay/overlaySlice";
import SortFilterButton from "../../../../common/components/SortFilterButton/SortFilterButton";
import { resetSearchQuery, selectSearchQuery } from "../../../../features/filters/filtersSlice";

import { useParams } from "react-router-dom";


const FriendsOfFriendsPage = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const { userId } = useParams();
    const currentUserId = useSelector(selectUserId);

    const friends = useSelector(selectFriends);

    const friendRequests = useSelector(selectFriendRequests);
    const friendsSortFilter = useSelector(selectFriendsSortFilter);
    const searchQuery = useSelector(selectSearchQuery);

    const [searchIsVisible, setSearchIsVisible] = useState(false);
    const [addPopupIsVisible, setAddPopupIsVisible] = useState(false);
    const [display, setDisplay] = useState("friends");
    const [addFriendId, setAddFriendId] = useState("");
    const [foundUser, setFoundUser] = useState(null);
    const [addFriendFeedback, setAddFriendFeedback] = useState("");
    const [displayedFriends, setDisplayedFriends] = useState([]);
    const [displayedFriendRequests, setDisplayedFriendRequests] = useState([]);
    const [hasMatches, setHasMatches] = useState(false);

    const [sortFiltersVisible, setSortFiltersVisible] = useState(false);

    const [friendsOfFriend, setFriendsOfFriend] = useState(null);
    const [friendProfile, setFriendProfile] = useState("");



    useEffect(() => {
        if (!userId) return;

        const fetchFriendProfile = async () => {
            const user = await getUserFromUserId(userId);
            setFriendProfile(user);

            const friendsData = await getFriendsByUserId(userId);
            setFriendsOfFriend(friendsData);
        };

        fetchFriendProfile();
    }, [userId]);

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
            searchResults = friendsOfFriend.filter(({ displayName }) => displayName.toLowerCase().includes(query));
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

    const handleBackClick = () => {
        navigate(`/view-profile/${userId}`);
    };

    const handleAddFriendClick = async (id) => {
        const updatedFriends = await sendFriendRequestToUser(currentUserId, id);
        dispatch(setFriends(updatedFriends));
        setAddFriendId("");

        // Update displayedFriends
        setDisplayedFriends(displayedFriends.map(friend => {
            if (friend.id === id) {
                return { ...friend, status: "pending" };
            }
            return friend;
        }));
    };

    const handleCancelClick = async (id) => {
        const updatedFriends = await cancelFriendRequest(currentUserId, id);
        dispatch(setFriends(updatedFriends));

        // Update displayedFriends
        setDisplayedFriends(displayedFriends.map(friend => {
            if (friend.id === id) {
                return { ...friend, status: "none" };
            }
            return friend;
        }));
    };


    const calculateMutualFriends = (userFriends) => {
        let mutualFriends = 0;

        userFriends?.forEach(({ userId: friendId, status }) => {
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

    // console.log("navigate:", navigate);
    // console.log("dispatch:", dispatch);
    // console.log("userId:", userId);
    // console.log("currentUserId:", currentUserId);
    // console.log("friends:", friends);
    // console.log("friendRequests:", friendRequests);
    // console.log("friendsSortFilter:", friendsSortFilter);
    // console.log("searchQuery:", searchQuery);
    // console.log("searchIsVisible:", searchIsVisible);
    // console.log("addPopupIsVisible:", addPopupIsVisible);
    // console.log("display:", display);
    // console.log("addFriendId:", addFriendId);
    // console.log("foundUser:", foundUser);
    // console.log("addFriendFeedback:", addFriendFeedback);
    // console.log("displayedFriends:", displayedFriends);
    // console.log("displayedFriendRequests:", displayedFriendRequests);
    // console.log("hasMatches:", hasMatches);
    // console.log("sortFiltersVisible:", sortFiltersVisible);
    // console.log("friendsOfFriend:", friendsOfFriend);
    // console.log("friendProfile:", friendProfile);
    return (
        <div className="friends-page-container">
            <header>
                <div className="container upper-nav">
                    <button className="back-button" onClick={handleBackClick}>
                        <FontAwesomeIcon className="icon" icon={faArrowLeft} />
                        Back
                    </button>

                    <h1>{friendProfile.displayName}'s Friends</h1>

                    <button onClick={handleSearchClick}>
                        {!searchIsVisible && <FontAwesomeIcon className="icon" icon={faMagnifyingGlass} />}
                        {searchIsVisible ? "Cancel" : "Search"}
                    </button>
                </div>

                {searchIsVisible && (
                    <div className="container search-and-filters">
                        <SearchBox type="friendsOfFriend" matches={hasMatches} />
                    </div>
                )}
            </header>

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
                        .map(({ id, displayName, iconColour, status, friendsOfFriend: userFriends }) => (
                            <FriendCard
                                key={id}
                                id={id}
                                displayName={displayName}
                                iconColour={iconColour}
                                mutualFriends={calculateMutualFriends(userFriends)}
                                button1Handler={() => handleAddFriendClick(id)}
                                button1Text="Add Friend"
                                status={status}
                                handleCancelClick={() => handleCancelClick(id)}
                            />
                        ))}
                </div>
            </main >
        </div >
    );
};

export default FriendsOfFriendsPage;