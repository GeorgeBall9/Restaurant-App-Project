import "./FriendsPageView/FriendsPageView.css";
import {
    faCircleCheck,
    faLink,
    faMagnifyingGlass,
    faPlus
} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import FormField from "../../common/components/FormField/FormField";
import {
    acceptFriendRequest, cancelFriendRequest, deleteFriend,
    getUserFromUserId, rejectFriendRequest,
    sendFriendRequestToUser
} from "../../firebase/firebase";
import {useDispatch, useSelector} from "react-redux";
import {
    removeFriend,
    removeFriendRequest,
    selectFriendRequests,
    selectFriends, selectFriendsSortFilter,
    selectUserId, setDisplayedFriend,
    setFriendRequests,
    setFriends
} from "../../features/user/userSlice";
import {hideOverlay, showOverlay} from "../../features/overlay/overlaySlice";
import {resetSearchQuery, selectSearchQuery} from "../../features/filters/filtersSlice";
import PrimaryButton from "../../common/components/PrimaryButton/PrimaryButton";
import SecondaryButton from "../../common/components/SecondaryButton/SecondaryButton";
import ProfileNavigation from "../../common/components/ProfileNavigation/ProfileNavigation";
import FriendRequestCard from "./FriendCards/FriendRequestCard/FriendRequestCard";
import PendingFriendCard from "./FriendCards/PendingFriendCard/PendingFriendCard";
import ConfirmedFriendCard from "./FriendCards/ConfirmedFriendCard/ConfirmedFriendCard";
import FriendsPageView from "./FriendsPageView/FriendsPageView";

const FriendsPage = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const userId = useSelector(selectUserId);
    const friends = useSelector(selectFriends);
    const friendRequests = useSelector(selectFriendRequests);

    const [display, setDisplay] = useState("friends");
    const [addFriendFeedback, setAddFriendFeedback] = useState("");
    const [foundUser, setFoundUser] = useState(null);
    const [displayedFriends, setDisplayedFriends] = useState([]);
    const [displayedFriendRequests, setDisplayedFriendRequests] = useState([]);
    const [searchHasMatches, setSearchHasMatches] = useState(true);

    useEffect(() => {
        if (!friends?.length) {
            setDisplayedFriends([]);
            return;
        }

        setDisplayedFriends(friends);
    }, [friends]);

    useEffect(() => {
        if (!friendRequests?.length) {
            setDisplayedFriendRequests([]);
            return;
        }

        setDisplayedFriendRequests(friendRequests);
    }, [friendRequests]);

    const handleFindUserClick = async (addFriendId) => {
        if (!addFriendId) {
            setAddFriendFeedback("Please enter a user ID");
        } else if (addFriendId === userId) {
            setAddFriendFeedback("You cannot add yourself as a friend");
        } else if (friends.some(friend => friend.id === addFriendId)) {
            setAddFriendFeedback("You are already friends with this user");
        } else if (friendRequests.includes(addFriendId)) {
            setAddFriendFeedback("You are already have a friend request from this user");
        } else {
            const user = await getUserFromUserId(addFriendId);

            if (!user) {
                setAddFriendFeedback("No user was found with that ID");
            } else if (user?.id !== userId) {
                setFoundUser(user);
            }
        }
    };

    const handleYesClick = async (addFriendId) => {
        const updatedFriends = await sendFriendRequestToUser(userId, addFriendId);
        dispatch(setFriends(updatedFriends));
        dispatch(hideOverlay());
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

    const handleDeleteClick = async (id) => {
        console.log("delete friend request");
        const updatedRequests = await rejectFriendRequest(userId, id);
        dispatch(setFriendRequests(updatedRequests));
        console.log("friend request deleted");
    };

    const handleProfileClick = async (userId) => {
        const friendData = await getUserFromUserId(userId);
        dispatch(setDisplayedFriend(friendData))
        navigate(`/view-profile/${userId}`);
    };

    const handleRemoveClick = async (id) => {
        console.log("show remove friend confirmation popup");
        await deleteFriend(userId, id);
        dispatch(removeFriend(id));
    };

    const calculateMutualFriends = (userFriends) => {
        let mutualFriends = 0;

        userFriends?.forEach(({userId: friendId, status}) => {
            if (status === "confirmed" && friends.some(f => f.id === friendId)) {
                mutualFriends++;
            }
        });

        return mutualFriends;
    };

    const copyLink = async () => {
        await navigator.clipboard.writeText("Hi! I'm using the web app {app_name_goes_here} and would like you " +
            "to join! \n\nFollow the link below and create an account: " +
            "\nhttps://restaurant-app-team22.netlify.app/sign-in");
    };

    const handleSearchButtonClicked = () => {
        dispatch(resetSearchQuery());
        setDisplayedFriends(friends);
        setDisplayedFriendRequests(friendRequests);
    };

    const handleSearchInputChange = (query) => {
        const lowerCaseQuery = query.toLowerCase();

        if (display === "friends") {
            const searchResults = displayedFriends
                .filter(({displayName}) => displayName.toLowerCase().includes(lowerCaseQuery));

            if (searchResults.length) {
                setDisplayedFriends(searchResults);
                setSearchHasMatches(true);
            } else {
                console.log("no results")
                setDisplayedFriends(friends);
                setSearchHasMatches(false);
            }
        } else {
            const searchResults = displayedFriendRequests
                .filter(({displayName}) => displayName.toLowerCase().includes(lowerCaseQuery));

            if (searchResults.length) {
                setDisplayedFriendRequests(searchResults);
                setSearchHasMatches(true);
            } else {
                setDisplayedFriendRequests(friendRequests);
                setSearchHasMatches(false);
            }
        }
    };

    const handleChangeDisplay = () => {
        setDisplay(display => display === "friends" ? "requests" : "friends");
        dispatch(resetSearchQuery());
    };

    return (
        <FriendsPageView
            display={display}
            handleSearch={handleSearchButtonClicked}
            handleChangeDisplay={handleChangeDisplay}
            friends={displayedFriends}
            friendRequests={displayedFriendRequests}
            copyLink={copyLink}
            addFriendFeedback={addFriendFeedback}
            handleFindUserClick={handleFindUserClick}
            foundUser={foundUser}
            handleYesClick={handleYesClick}
            calculateMutualFriends={calculateMutualFriends}
            handleCancelClick={handleCancelClick}
            handleConfirmClick={handleConfirmClick}
            handleDeleteClick={handleDeleteClick}
            handleProfileClick={handleProfileClick}
            handleRemoveClick={handleRemoveClick}
            handleSearchInputChange={handleSearchInputChange}
            searchHasMatches={searchHasMatches}
        />
    );
};

export default FriendsPage;