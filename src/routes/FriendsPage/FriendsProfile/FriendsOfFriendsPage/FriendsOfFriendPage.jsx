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
    // const userId = useSelector(selectUserId);

    const friends = useSelector(selectFriends);

    const friendRequests = useSelector(selectFriendRequests);
    const friendsSortFilter = useSelector(selectFriendsSortFilter);
    const searchQuery = useSelector(selectSearchQuery);

    const [searchIsVisible, setSearchIsVisible] = useState(false);
    const [addPopupIsVisible, setAddPopupIsVisible] = useState(false);
    const [display, setDisplay] = useState("friends");
    const [addFriendId, setAddFriendId] = useState("");
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
        setDisplayedFriends(friendsOfFriend);
    }, [friendsOfFriend]);

    const handleBackClick = () => {
        navigate(`/view-profile/${userId}`);
    };

    const handleAddClick = () => {
        setAddPopupIsVisible(true);
        dispatch(showOverlay());
    };

    const handleYesClick = async () => {
        const updatedFriends = await sendFriendRequestToUser(userId, addFriendId);
        dispatch(setFriends(updatedFriends));
        setAddPopupIsVisible(false);
        setAddFriendId("");
        dispatch(hideOverlay());
    };

    const handleNoClick = () => {
        setAddPopupIsVisible(false);
        setAddFriendId("");
        dispatch(hideOverlay());
    };

    const handleDeleteClick = async (id) => {
        console.log("delete friend request");
        const updatedRequests = await rejectFriendRequest(userId, id);
        dispatch(setFriendRequests(updatedRequests));
        console.log("friend request deleted");
    };

    const handleProfileClick = (userId) => {
        navigate(`/view-profile/${userId}`);
    };

    const handleRemoveClick = async (id) => {
        console.log("show remove friend confirmation popup");
        await deleteFriend(userId, id);
        dispatch(removeFriend(id));
    };

    const handleCancelClick = async (id) => {
        const updatedFriends = await cancelFriendRequest(userId, id);
        dispatch(setFriends(updatedFriends));
    };

    const handleConfirmClick = async (id) => {
        console.log("confirm friend");
        const updatedFriends = await acceptFriendRequest(userId, id);
        dispatch(setFriends(updatedFriends));
        dispatch(removeFriendRequest(id));
        console.log("friend request accepted");
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

                {/* {foundUser && (
                            <p>Send friend request to <span>{foundUser.displayName}</span>?</p>
                        )}

                        {!foundUser && (
                            <ActionButtons
                                button1Handler={handleFindUserClick}
                                button1Text="Find user"
                                button2Handler={handleNoClick}
                                button2Text="Cancel"
                            />
                        )}

                        {foundUser && (
                            <ActionButtons
                                button1Handler={handleYesClick}
                                button1Text="Yes"
                                button2Handler={handleNoClick}
                                button2Text="No"
                            />
                        )} */}

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
                                button1Handler={handleAddClick}
                                button1Text="Add"
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