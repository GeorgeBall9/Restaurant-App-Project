import "./FriendsPage.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faArrowLeft, faChevronDown,
    faCircleCheck,
    faCirclePlus,
    faLink,
    faMagnifyingGlass,
    faPlus
} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";
import UserIcon from "../../common/components/UserIcon/UserIcon";
import SearchBox from "../../common/components/SearchBox/SearchBox";
import {useEffect, useState} from "react";
import FormField from "../../common/components/FormField/FormField";
import {
    acceptFriendRequest, cancelFriendRequest,
    getFriendRequestsByUserId,
    getFriendsByUserId,
    getUserFromUserId, rejectFriendRequest, removeFriend,
    sendFriendRequestToUser
} from "../../firebase/firebase";
import {useDispatch, useSelector} from "react-redux";
import {selectUserId} from "../../features/user/userSlice";
import LinkButton from "./LinkButton/LinkButton";
import FriendInfo from "./FriendCard/FriendInfo/FriendInfo";
import ActionButtons from "./FriendCard/ActionButtons/ActionButtons";
import FriendCard from "./FriendCard/FriendCard";
import {hideOverlay, showOverlay} from "../../features/overlay/overlaySlice";
import SortFilterButton from "../ReviewsPage/SortFilterButton/SortFilterButton";

const FriendsPage = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const userId = useSelector(selectUserId);

    const [searchIsVisible, setSearchIsVisible] = useState(false);
    const [addPopupIsVisible, setAddPopupIsVisible] = useState(false);
    const [display, setDisplay] = useState("friends");
    const [addFriendId, setAddFriendId] = useState("");
    const [addFriendFeedback, setAddFriendFeedback] = useState("");
    const [foundUser, setFoundUser] = useState(null);
    const [friends, setFriends] = useState([]);
    const [friendRequests, setFriendRequests] = useState([]);
    const [inviteCopied, setInviteCopied] = useState(false);

    const [sortFiltersVisible, setSortFiltersVisible] = useState(false);
    const [sortFilterSelected, setSortFilterSelected] = useState();

    useEffect(() => {
        if (!userId) return;

        getFriendRequestsByUserId(userId)
            .then(data => {
                if (data) {
                    setFriendRequests(data)
                }
            });
    }, [userId]);

    useEffect(() => {
        if (!userId) return;

        getFriendsByUserId(userId)
            .then(data => {
                if (data) {
                    setFriends(data)
                }
            });
    }, [userId]);

    const handleBackClick = () => {
        navigate("/profile");
    };

    const handleDisplayLinkClick = () => {
        setDisplay(display => display === "friends" ? "requests" : "friends");
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
        setFriends(updatedFriends);
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
        setFriends(updatedFriends);
    };

    const handleConfirmClick = async (id) => {
        console.log("confirm friend");
        const updatedFriends = await acceptFriendRequest(userId, id);
        setFriends(updatedFriends);
        setFriendRequests(friendRequests => friendRequests.filter(request => request.id !== id));
        console.log("friend request accepted");
    };

    const handleDeleteClick = async (id) => {
        console.log("delete friend request");
        const updatedRequests = await rejectFriendRequest(userId, id);
        setFriendRequests(updatedRequests);
        console.log("friend request deleted");
    };

    const handleProfileClick = () => {
        console.log("show user profile");
    };

    const handleRemoveClick = async (id) => {
        console.log("show remove friend confirmation popup");
        const updatedFriends = await removeFriend(userId, id);
        setFriends(updatedFriends);
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

    const handleSortFilterClick = ({text, filter, multiplier}) => {

        const sortArrayByFilter = (array, filter, multiplier) => {
            return [...array].sort((a, b) => multiplier * (a[filter] - b[filter]));
        };

        setFriends(friends => sortArrayByFilter(friends));

        setFriendRequests(requests => sortArrayByFilter(requests));

        setSortFilterSelected(text);
        setSortFiltersVisible(false);
    };

    return (
        <div className="friends-page-container">
            <header>
                <div className="container upper-nav">
                    <button className="back-button" onClick={handleBackClick}>
                        <FontAwesomeIcon className="icon" icon={faArrowLeft}/>
                        Back
                    </button>

                    <h1>{display}</h1>

                    <button onClick={() => setSearchIsVisible(searchIsVisible => !searchIsVisible)}>
                        {!searchIsVisible && <FontAwesomeIcon className="icon" icon={faMagnifyingGlass}/>}
                        {searchIsVisible ? "Cancel" : "Search"}
                    </button>
                </div>

                {searchIsVisible && (
                    <div className="container search-and-filters">
                        <SearchBox/>

                        <div>
                            <button className="reviews-sort-button" onClick={handleSortClick}>
                                Sort
                                <FontAwesomeIcon icon={faChevronDown} className="icon"/>
                            </button>

                            {sortFiltersVisible && (
                                <div className="sort-filters">
                                    <SortFilterButton
                                        text="Most recent"
                                        filter="date"
                                        multiplier={-1}
                                        active={sortFilterSelected === "Most recent"}
                                        clickHandler={handleSortFilterClick}
                                    />

                                    <SortFilterButton
                                        text="Oldest"
                                        filter="date"
                                        multiplier={1}
                                        active={sortFilterSelected === "Oldest"}
                                        clickHandler={handleSortFilterClick}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </header>

            <main className="container">
                <div className="links-container">
                    <button className="display-button" onClick={handleDisplayLinkClick}>
                        {display === "friends" ? "Requests" : "Friends"}

                        <p className="count">
                            {display === "friends" ?
                                (friendRequests?.length ? friendRequests?.length : 0)
                                :
                                (friends?.length ? friends?.length : 0)
                            }
                        </p>
                    </button>

                    {display === "friends" && (
                        <div>
                            <LinkButton
                                handleClick={handleAddClick}
                                text="Add"
                                icon={faPlus}
                            />

                            <LinkButton
                                handleClick={handleInviteClick}
                                text={inviteCopied ? "Copied" : "Invite"}
                                icon={inviteCopied ? faCircleCheck : faLink}
                            />
                        </div>
                    )}
                </div>

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
                        )}
                    </div>
                )}

                {display === "requests" && (
                    <div className="friend-icons-container">
                        {friendRequests && friendRequests.map(({id, displayName, iconColour, friends: userFriends}) => (
                            <FriendCard
                                key={id}
                                id={id}
                                displayName={displayName}
                                iconColour={iconColour}
                                mutualFriends={calculateMutualFriends(userFriends)}
                                button1Handler={() => handleConfirmClick(id)}
                                button1Text="Confirm"
                                button2Handler={() => handleDeleteClick(id)}
                                button2Text="Delete"
                            />
                        ))}
                    </div>
                )}

                {display === "friends" && (
                    <div className="friend-icons-container">
                        {friends && friends
                            .sort((a, b) => {
                                if (a.status === "pending") {
                                    return -1;
                                } else if (b.status === "pending") {
                                    return 1;
                                } else {
                                    return 0;
                                }
                            })
                            .map(({id, displayName, iconColour, status, friends: userFriends}) => (
                                <FriendCard
                                    key={id}
                                    id={id}
                                    displayName={displayName}
                                    iconColour={iconColour}
                                    mutualFriends={calculateMutualFriends(userFriends)}
                                    status={status}
                                    button1Handler={handleProfileClick}
                                    button1Text="Profile"
                                    button2Handler={() => handleRemoveClick(id)}
                                    button2Text="Remove"
                                    handleCancelClick={() => handleCancelClick(id)}
                                />
                            ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default FriendsPage;