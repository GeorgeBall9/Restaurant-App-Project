import "./FriendsPageView.css";
import ProfileNavigation from "../../../common/components/ProfileNavigation/ProfileNavigation";
import {faCircleCheck, faLink, faMagnifyingGlass, faPlus} from "@fortawesome/free-solid-svg-icons";
import FormField from "../../../common/components/FormField/FormField";
import PrimaryButton from "../../../common/components/PrimaryButton/PrimaryButton";
import SecondaryButton from "../../../common/components/SecondaryButton/SecondaryButton";
import FriendRequestCard from "../FriendCards/FriendRequestCard/FriendRequestCard";
import PendingFriendCard from "../FriendCards/PendingFriendCard/PendingFriendCard";
import ConfirmedFriendCard from "../FriendCards/ConfirmedFriendCard/ConfirmedFriendCard";
import {useNavigate} from "react-router-dom";
import {useState} from "react";

const FriendsPageView = ({
                             handleSearch,
                             handleChangeDisplay,
                             friends,
                             friendRequests,
                             handleInviteClick,
                             addFriendFeedback,
                             handleFindUserClick,
                             foundUser,
                             handleYesClick,
                             calculateMutualFriends,
                             handleCancelClick,
                             handleConfirmClick,
                             handleDeleteClick,
                             handleProfileClick,
                             handleRemoveClick
                         }) => {

    const navigate = useNavigate();

    const [searchIsVisible, setSearchIsVisible] = useState(false);
    const [display, setDisplay] = useState("friends");
    const [addPopupIsVisible, setAddPopupIsVisible] = useState(false);
    const [inviteCopied, setInviteCopied] = useState(false);
    const [addFriendId, setAddFriendId] = useState("");

    const handleSearchClick = () => {
        handleSearch();
        setSearchIsVisible(searchIsVisible => !searchIsVisible);
    };

    const handleNoClick = () => {
        setAddPopupIsVisible(false);
        setAddFriendId("");
    };

    const handleConfirmSendFriendRequest = () => {
        handleYesClick(addFriendId);
        setAddPopupIsVisible(false);
        setAddFriendId("");
    };

    const handleToggleDisplayClick = () => {
        handleChangeDisplay();
        setDisplay(display => display === "friends" ? "requests" : "friends");
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
                toggleHandler={handleToggleDisplayClick}
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
                                <PrimaryButton handleClick={() => handleFindUserClick(addFriendId)} text="Find user"/>
                                <SecondaryButton handleClick={handleNoClick} text="Cancel"/>
                            </div>
                        )}

                        {foundUser && (
                            <div className="buttons-container">
                                <PrimaryButton handleClick={handleConfirmSendFriendRequest} text="Yes"/>
                                <SecondaryButton handleClick={handleNoClick} text="No"/>
                            </div>
                        )}
                    </div>
                )}

                {display === "requests" && (
                    <div className="friend-icons-container">
                        {friendRequests.map(({
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
                        {[...friends]
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

export default FriendsPageView;