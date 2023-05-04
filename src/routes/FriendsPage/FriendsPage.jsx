import "./FriendsPage.css";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
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
    selectFriends,
    selectUserId, setDisplayedFriend,
    setFriendRequests,
    setFriends
} from "../../features/user/userSlice";
import {resetSearchQuery} from "../../features/filters/filtersSlice";
import ProfileNavigationView from "../../common/components/ProfileNavigationView/ProfileNavigationView";
import {faCircleCheck, faLink, faMagnifyingGlass, faPlus} from "@fortawesome/free-solid-svg-icons";
import FriendRequestCard from "./FriendCards/FriendRequestCard/FriendRequestCard";
import PendingFriendCard from "./FriendCards/PendingFriendCard/PendingFriendCard";
import ConfirmedFriendCard from "./FriendCards/ConfirmedFriendCard/ConfirmedFriendCard";
import AddFriendPopupView from "./AddFriendPopupView/AddFriendPopupView";
import NoResults from "../../common/components/NoResults/NoResults";

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
    const [navButton2IsVisible, setNavButton2IsVisible] = useState(null);
    const [searchIsVisible, setSearchIsVisible] = useState(false);
    const [addPopupIsVisible, setAddPopupIsVisible] = useState(false);
    const [inviteCopied, setInviteCopied] = useState(false);

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

    useEffect(() => {
        if (display === "friends") {
            if (friends.length) {
                setNavButton2IsVisible(true);
            } else {
                setNavButton2IsVisible(false);
            }
        } else {
            if (friendRequests.length) {
                setNavButton2IsVisible(true);
            } else {
                setNavButton2IsVisible(false);
            }
        }
    }, [display, friends, friendRequests]);

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

    const sendFriendRequest = async (addFriendId) => {
        const updatedFriends = await sendFriendRequestToUser(userId, addFriendId);
        dispatch(setFriends(updatedFriends));
        setAddPopupIsVisible(false);
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

    const handleInviteClick = async () => {
        await navigator.clipboard.writeText("Hi! I'm using the web app {app_name_goes_here} and would like you " +
            "to join! \n\nFollow the link below and create an account: " +
            "\nhttps://restaurant-app-team22.netlify.app/sign-in");

        setInviteCopied(true);
    };

    const handleSearchClick = () => {
        dispatch(resetSearchQuery());
        setDisplayedFriends(friends);
        setDisplayedFriendRequests(friendRequests);
        setSearchIsVisible(searchIsVisible => !searchIsVisible);
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
        <div className="friends-page-container">
            <ProfileNavigationView
                pageTitle={display}
                button1={{
                    handler: () => navigate("/profile")
                }}
                button2={!navButton2IsVisible ? null : {
                    text: searchIsVisible ? "Cancel" : "Search",
                    icon: !searchIsVisible ? faMagnifyingGlass : null,
                    handler: handleSearchClick
                }}
                lowerNav={true}
                toggleDisplayText={display === "friends" ? "Requests" : "Friends"}
                toggleHandler={handleChangeDisplay}
                count={display === "friends" ?
                    (friendRequests?.length ? friendRequests?.length : 0)
                    :
                    (friends?.length ? friends?.length : 0)
                }
                searchFunctionality={searchIsVisible}
                button3={{
                    text: "Add",
                    icon: faPlus,
                    handler: () => setAddPopupIsVisible(true)
                }}
                button4={{
                    text: inviteCopied ? "Copied" : "Invite",
                    icon: inviteCopied ? faCircleCheck : faLink,
                    handler: handleInviteClick
                }}
                handleSearchInputChange={handleSearchInputChange}
                hasMatches={searchHasMatches}
            />

            <main className="container">
                {addPopupIsVisible && (
                    <AddFriendPopupView
                        feedback={addFriendFeedback}
                        foundUser={foundUser}
                        handleFindUserClick={handleFindUserClick}
                        handleNoClick={() => setAddPopupIsVisible(false)}
                        sendFriendRequest={sendFriendRequest}
                    />
                )}

                {display === "requests" && (displayedFriendRequests?.length ? (
                    displayedFriendRequests
                        .map(({id, displayName, iconColour, profilePhotoUrl, friends: userFriends}) => (
                        <FriendRequestCard
                            key={id}
                            id={id}
                            displayName={displayName}
                            iconColour={iconColour}
                            profilePhotoUrl={profilePhotoUrl}
                            mutualFriends={calculateMutualFriends(userFriends)}
                        />
                    ))) : (
                    <NoResults mainText="You do not currently have any friend requests" />
                ))}


                {display === "friends" && (displayedFriends?.length ? (
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
                                            id={id}
                                            displayName={displayName}
                                            iconColour={iconColour}
                                            profilePhotoUrl={profilePhotoUrl}
                                            mutualFriends={calculateMutualFriends(userFriends)}
                                        />
                                    )
                                } else {
                                    return (
                                        <ConfirmedFriendCard
                                            key={id}
                                            id={id}
                                            displayName={displayName}
                                            iconColour={iconColour}
                                            profilePhotoUrl={profilePhotoUrl}
                                            mutualFriends={calculateMutualFriends(userFriends)}
                                        />
                                    )
                                }
                            })}
                    </div>
                ) : (
                    <NoResults
                        mainText="You do not currently have any friends"
                        subText="Ask a friend to send you their user ID and use the add button above to add them"
                    />
                ))}
            </main>
        </div>
    );
};

export default FriendsPage;