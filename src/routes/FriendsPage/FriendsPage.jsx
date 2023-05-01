import "./FriendsPage.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faArrowLeft, faChevronDown,
    faCircleCheck,
    faLink,
    faMagnifyingGlass,
    faPlus
} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";
import SearchBox from "../../common/components/SearchBox/SearchBox";
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
import LinkButton from "./LinkButton/LinkButton";
import FriendCard from "./FriendCards/FriendCard/FriendCard";
import {hideOverlay, showOverlay} from "../../features/overlay/overlaySlice";
import SortFilterButton from "../../common/components/SortFilterButton/SortFilterButton";
import {resetSearchQuery, selectSearchQuery} from "../../features/filters/filtersSlice";
import PrimaryButton from "../../common/components/PrimaryButton/PrimaryButton";
import SecondaryButton from "../../common/components/SecondaryButton/SecondaryButton";
import ProfileNavigation from "../../common/components/ProfileNavigation/ProfileNavigation";
import FriendRequestCard from "./FriendCards/FriendRequestCard/FriendRequestCard";
import PendingFriendCard from "./FriendCards/PendingFriendCard/PendingFriendCard";
import ConfirmedFriendCard from "./FriendCards/ConfirmedFriendCard/ConfirmedFriendCard";

const FriendsPage = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const userId = useSelector(selectUserId);
    const friends = useSelector(selectFriends);
    const friendRequests = useSelector(selectFriendRequests);
    const friendsSortFilter = useSelector(selectFriendsSortFilter);
    const searchQuery = useSelector(selectSearchQuery);

    const [searchIsVisible, setSearchIsVisible] = useState(false);
    const [addPopupIsVisible, setAddPopupIsVisible] = useState(false);
    const [display, setDisplay] = useState("friends");
    const [addFriendId, setAddFriendId] = useState("");
    const [addFriendFeedback, setAddFriendFeedback] = useState("");
    const [foundUser, setFoundUser] = useState(null);
    const [displayedFriends, setDisplayedFriends] = useState([]);
    const [displayedFriendRequests, setDisplayedFriendRequests] = useState([]);
    const [inviteCopied, setInviteCopied] = useState(false);
    const [hasMatches, setHasMatches] = useState(false);

    const [sortFiltersVisible, setSortFiltersVisible] = useState(false);

    useEffect(() => {
        if (!friends?.length) return;

        setDisplayedFriends(friends);
    }, [friends]);

    useEffect(() => {
        if (!friendRequests?.length) return;

        setDisplayedFriendRequests(friendRequests);
    }, [friendRequests]);

    useEffect(() => {
        if (display === "friends" && !friends || display === "request" && !friendRequests) return;

        if (!searchQuery) {
            if (display === "friends") {
                setDisplayedFriends(friends);
            } else {
                setDisplayedFriendRequests(friendRequests);
            }
            return;
        }

        const query = searchQuery.toLowerCase();

        let searchResults;

        if (display === "friends") {
            searchResults = friends.filter(({displayName}) => displayName.toLowerCase().includes(query));
        } else {
            searchResults = friendRequests.filter(({displayName}) => displayName.toLowerCase().includes(query));
        }

        if (!searchResults.length) {
            setHasMatches(false);

            if (display === "friends") {
                setDisplayedFriends(friends);
            } else {
                setDisplayedFriendRequests(friendRequests);
            }
        } else {
            if (display === "friends") {
                setDisplayedFriends(searchResults);
            } else {
                setDisplayedFriendRequests(searchResults);
            }
            setHasMatches(true);
        }
    }, [searchQuery, friends, friendRequests]);

    const handleDisplayLinkClick = () => {
        setDisplay(display => display === "friends" ? "requests" : "friends");
        dispatch(resetSearchQuery());
        setSearchIsVisible(false);
    };

    const handleFindUserClick = async () => {
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

    const handleInviteClick = () => {
        navigator.clipboard.writeText("Hi! I'm using the web app {app_name_goes_here} and would like you to " +
            "join! \n\nFollow the link below and create an account: " +
            "\nhttps://restaurant-app-team22.netlify.app/sign-in")
            .then(() => setInviteCopied(true));
    };

    const handleSortClick = () => {
        setSortFiltersVisible(sortFiltersVisible => !sortFiltersVisible);
    };

    const handleSearchClick = () => {
        dispatch(resetSearchQuery());
        setDisplayedFriends(friends);
        setDisplayedFriendRequests(friendRequests);
        setSearchIsVisible(searchIsVisible => !searchIsVisible);
    };

    return (
        <div className="friends-page-container">
            <ProfileNavigation
                pageTitle={display}
                button1={{
                    handler: () => navigate("/profile")
                }}
                button2={{
                    text: searchIsVisible ? "Cancel" : "Search",
                    icon: !searchIsVisible ? faMagnifyingGlass : null,
                    handler: handleSearchClick
                }}
                lowerNav={true}
                toggleDisplayText={display === "friends" ? "Requests" : "Friends"}
                toggleHandler={handleDisplayLinkClick}
                count={display === "friends" ?
                    (friendRequests?.length ? friendRequests?.length : 0)
                    :
                    (friends?.length ? friends?.length : 0)
                }
                searchFunctionality={searchIsVisible}
                button3={{
                    text: "Add",
                    icon: faPlus,
                    handler: handleAddClick
                }}
                button4={{
                    text: inviteCopied ? "Copied" : "Invite",
                    icon: inviteCopied ? faCircleCheck : faLink,
                    handler: handleInviteClick
                }}
            />

            <main className="container">
                {addPopupIsVisible && (
                    <div className="confirm-checkin-popup">
                        {addFriendFeedback && (
                            <p className="feedback">{addFriendFeedback}</p>
                        )}

                        <div className="date-container">
                            <FormField
                                label="Friend ID"
                                name="visitDate"
                                type="text"
                                value={addFriendId}
                                onChangeHandler={({target}) => setAddFriendId(target.value)}
                            />
                        </div>

                        {foundUser && (
                            <p>Send friend request to <span>{foundUser.displayName}</span>?</p>
                        )}

                        {!foundUser && (
                            <div className="buttons-container">
                                <PrimaryButton handleClick={handleFindUserClick} text="Find user"/>
                                <SecondaryButton handleClick={handleNoClick} text="Cancel"/>
                            </div>
                        )}

                        {foundUser && (
                            <div className="buttons-container">
                                <PrimaryButton handleClick={handleYesClick} text="Yes"/>
                                <SecondaryButton handleClick={handleNoClick} text="No"/>
                            </div>
                        )}
                    </div>
                )}

                {display === "requests" && (
                    <div className="friend-icons-container">
                        {displayedFriendRequests.map(({
                                                          id,
                                                          displayName,
                                                          iconColour,
                                                          profilePhotoUrl,
                                                          friends: userFriends
                                                      }) => (

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
                )}

                {display === "friends" && (
                    <div className="friend-icons-container">
                        {[...displayedFriends]
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
                )}
            </main>
        </div>
    );
};

export default FriendsPage;