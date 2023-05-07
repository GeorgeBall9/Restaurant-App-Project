import FriendCard from "../FriendCard/FriendCard";
import {deleteFriend, getUserFromUserId} from "../../../../firebase/firebase";
import {removeFriend, selectUserId, setDisplayedFriend} from "../../../../features/user/userSlice";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import ConfirmationPopupView from "../../../../common/components/ConfirmationPopupView/ConfirmationPopupView";

const ConfirmedFriendCard = ({id, displayName, iconColour, profilePhotoUrl, mutualFriends}) => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const userId = useSelector(selectUserId);

    const [confirmRemovePopupIsVisible, setConfirmRemovePopupIsVisible] = useState(false);

    const handleProfileClick = async () => {
        const friendData = await getUserFromUserId(id);
        dispatch(setDisplayedFriend(friendData))
        navigate(`/view-profile/${id}`);
    };

    const handleRemoveFriend = async () => {
        console.log("show remove friend confirmation popup");
        await deleteFriend(userId, id);
        dispatch(removeFriend(id));
    };

    return (
        <>
            <FriendCard
                displayName={displayName}
                iconColour={iconColour}
                profilePhotoUrl={profilePhotoUrl}
                mutualFriends={mutualFriends}
                status="confirmed"
                button1Handler={handleProfileClick}
                button1Text="Profile"
                button2Handler={() => setConfirmRemovePopupIsVisible(true)}
                button2Text="Remove"
            />

            {confirmRemovePopupIsVisible && (
                <ConfirmationPopupView
                    message={`Remove ${displayName} as a friend?`}
                    handleYesClick={handleRemoveFriend}
                    handleNoClick={() => setConfirmRemovePopupIsVisible(false)}
                />
            )}
        </>
    );
};

export default ConfirmedFriendCard;