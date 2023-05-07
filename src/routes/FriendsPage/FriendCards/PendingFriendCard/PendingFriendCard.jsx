import FriendCard from "../FriendCard/FriendCard";
import {cancelFriendRequest} from "../../../../firebase/firebase";
import {selectUserId, setFriends} from "../../../../features/user/userSlice";
import {useDispatch, useSelector} from "react-redux";
import ConfirmationPopupView from "../../../../common/components/ConfirmationPopupView/ConfirmationPopupView";
import {useState} from "react";

const PendingFriendCard = ({id, displayName, iconColour, profilePhotoUrl, mutualFriends}) => {

    const dispatch = useDispatch();

    const userId = useSelector(selectUserId);

    const [confirmACancelPopupIsVisible, setConfirmCancelPopupIsVisible] = useState(false);

    const handleCancelClick = async () => {
        const updatedFriends = await cancelFriendRequest(userId, id);
        dispatch(setFriends(updatedFriends));
    };

    return (
        <>
            <FriendCard
                displayName={displayName}
                iconColour={iconColour}
                profilePhotoUrl={profilePhotoUrl}
                mutualFriends={mutualFriends}
                status="pending"
                handleCancelClick={() => setConfirmCancelPopupIsVisible(true)}
            />

            {confirmACancelPopupIsVisible && (
                <ConfirmationPopupView
                    message={`Cancel friend request to ${displayName}?`}
                    handleYesClick={handleCancelClick}
                    handleNoClick={() => setConfirmCancelPopupIsVisible(false)}
                />
            )}
        </>
    );
};

export default PendingFriendCard;