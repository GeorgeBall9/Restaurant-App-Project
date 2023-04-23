import "./FriendsPage.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faCirclePlus, faLink, faMagnifyingGlass, faPlus} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";
import UserIcon from "../../common/components/UserIcon/UserIcon";
import SearchBox from "../../common/components/SearchBox/SearchBox";
import {useEffect, useState} from "react";
import FormField from "../../common/components/FormField/FormField";
import {getFriendRequestsByUserId, getUserFromUserId, sendFriendRequestToUser} from "../../firebase/firebase";
import {useSelector} from "react-redux";
import {selectUserId} from "../../features/user/userSlice";

const FriendsPage = () => {

    const navigate = useNavigate();

    const userId = useSelector(selectUserId);

    const [searchIsVisible, setSearchIsVisible] = useState(false);
    const [addPopupIsVisible, setAddPopupIsVisible] = useState(false);
    const [display, setDisplay] = useState("friends");
    const [addFriendId, setAddFriendId] = useState("");
    const [foundUser, setFoundUser] = useState(null);
    const [friendRequests, setFriendRequests] = useState(null);

    useEffect(() => {
        if (!userId) return;

        getFriendRequestsByUserId(userId)
            .then(data => setFriendRequests(data));
    }, [userId]);

    const handleBackClick = () => {
        navigate("/profile");
    };

    const handleDisplayLinkClick = () => {
        setDisplay(display => display === "friends" ? "requests" : "friends");
    };

    const handleFindUserClick = async () => {
        const user = await getUserFromUserId(addFriendId);

        if (user?.id !== userId) {
            setFoundUser(user);
        }
    };

    const handleYesClick = async () => {
        await sendFriendRequestToUser(userId, addFriendId);
    };

    const handleNoClick = () => {
        setAddPopupIsVisible(false);
        setAddFriendId("");
    };

    return (
        <div className="friends-page-container">
            <header>
                <div className="container">
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
                    <div className="container">
                        <SearchBox/>
                    </div>
                )}
            </header>

            <main className="container">
                <div className="links-container">
                    <button className="display-button" onClick={handleDisplayLinkClick}>
                        {display === "friends" ? "Requests" : "Friends"}
                    </button>

                    <div>
                        <button onClick={() => setAddPopupIsVisible(true)}>
                            Add
                            <FontAwesomeIcon className="icon" icon={faPlus}/>
                        </button>

                        <button>
                            Invite
                            <FontAwesomeIcon className="icon" icon={faLink}/>
                        </button>
                    </div>
                </div>

                {addPopupIsVisible && (
                    <div className="confirm-checkin-popup">
                        <div className="date-container">
                            <FormField
                                label="Friend ID"
                                name="visitDate"
                                type="text"
                                value={addFriendId}
                                onChangeHandler={({target}) => setAddFriendId(target.value)}
                            />
                        </div>

                        {foundUser && <p>Send friend request to <span>{foundUser.displayName}</span>?</p>}

                        {!foundUser && (
                            <div className="buttons-container">
                                <button onClick={handleFindUserClick}>Find user</button>
                                <button onClick={handleNoClick}>Cancel</button>
                            </div>
                        )}

                        {foundUser && (
                            <div className="buttons-container">
                                <button onClick={handleYesClick}>Yes</button>
                                <button onClick={handleNoClick}>No</button>
                            </div>
                        )}
                    </div>
                )}

                {display === "requests" && (
                    <div className="friend-icons-container">
                        {friendRequests && friendRequests.map(({id, displayName, iconColour}) => (
                            <div key={id} className="friend-icon-container">
                                <div>
                                    <UserIcon size="larger" colour={iconColour}/>

                                    <div className="info-container">
                                        <h3>{displayName}</h3>
                                        <p>6 mutual friends</p>
                                    </div>
                                </div>

                                <div className="buttons-container">
                                    <button onClick={handleYesClick}>Confirm</button>
                                    <button onClick={handleNoClick}>Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {display === "friends" && (
                    <div className="friend-icons-container">
                        {[...Array(3)].map(() => (
                            <div className="friend-icon-container">
                                <div>
                                    <UserIcon size="larger"/>

                                    <div className="info-container">
                                        <h3>username</h3>
                                        <p>6 mutual friends</p>
                                    </div>
                                </div>

                                <div className="buttons-container">
                                    <button onClick={handleYesClick}>Profile</button>
                                    <button onClick={handleNoClick}>Remove</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default FriendsPage;