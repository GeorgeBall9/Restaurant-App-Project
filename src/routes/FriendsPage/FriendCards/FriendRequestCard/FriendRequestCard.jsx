import FriendCard from "../FriendCard/FriendCard";
import {acceptFriendRequest, rejectFriendRequest} from "../../../../firebase/firebase";
import {removeFriendRequest, selectUserId, setFriendRequests, setFriends} from "../../../../features/user/userSlice";
import {useDispatch, useSelector} from "react-redux";
import ConfirmationPopupView from "../../../../common/components/popups/ConfirmationPopupView/ConfirmationPopupView";
import {useState} from "react";

const FriendRequestCard = ({id, displayName, iconColour, profilePhotoUrl, mutualFriends}) => {

    const dispatch = useDispatch();

    const userId = useSelector(selectUserId);

    const [confirmRequestPopupIsVisible, setConfirmRequestPopupIsVisible] = useState(false);
    const [deleteRequestPopupIsVisible, setDeleteRequestPopupIsVisible] = useState(false);

    const handleConfirmClick = async () => {
        console.log("confirm friend");
        const updatedFriends = await acceptFriendRequest(userId, id);
        dispatch(setFriends(updatedFriends));
        dispatch(removeFriendRequest(id));
        console.log("friend request accepted");
    };

    const handleDeleteClick = async () => {
        console.log("delete friend request");
        const updatedRequests = await rejectFriendRequest(userId, id);
        dispatch(setFriendRequests(updatedRequests));
        console.log("friend request deleted");
    };

    return (
        <>
            <FriendCard
                displayName={displayName}
                iconColour={iconColour}
                profilePhotoUrl={profilePhotoUrl}
                mutualFriends={mutualFriends}
                status="request"
                button1Handler={() => setConfirmRequestPopupIsVisible(true)}
                button1Text="Confirm"
                button2Handler={() => setDeleteRequestPopupIsVisible(true)}
                button2Text="Delete"
            />

            {confirmRequestPopupIsVisible && (
                <ConfirmationPopupView
                    message={`Confirm friend request from ${displayName}?`}
                    handleYesClick={handleConfirmClick}
                    handleNoClick={() => setConfirmRequestPopupIsVisible(false)}
                />
            )}

            {deleteRequestPopupIsVisible && (
                <ConfirmationPopupView
                    message={`Delete friend request from ${displayName}?`}
                    handleYesClick={handleDeleteClick}
                    handleNoClick={() => setDeleteRequestPopupIsVisible(false)}
                />
            )}
        </>
    );
};

export default FriendRequestCard;