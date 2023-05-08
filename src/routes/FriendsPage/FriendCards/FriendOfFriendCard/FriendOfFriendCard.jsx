import FriendCard from "../FriendCard/FriendCard";
import ConfirmationPopupView from "../../../../common/components/ConfirmationPopupView/ConfirmationPopupView";
import {useState} from "react";
import {sendFriendRequestToUser} from "../../../../firebase/firebase";
import {selectUserId, setFriends} from "../../../../features/user/userSlice";
import {useDispatch, useSelector} from "react-redux";

const FriendOfFriendCard = ({id, displayName, iconColour, profilePhotoUrl, mutualFriends}) => {

    const dispatch = useDispatch();

    const userId = useSelector(selectUserId);

    const [confirmAddPopupIsVisible, setConfirmAddPopupIsVisible] = useState(false);

    const handleAddClick = async () => {
        const updatedFriends = await sendFriendRequestToUser(userId, id);
        dispatch(setFriends(updatedFriends));
    };

    return (
        <>
            <FriendCard
                displayName={displayName}
                iconColour={iconColour}
                profilePhotoUrl={profilePhotoUrl}
                mutualFriends={mutualFriends}
                status="friendOfFriend"
                handleAddClick={() => setConfirmAddPopupIsVisible(true)}
            />

            {confirmAddPopupIsVisible && (
                <ConfirmationPopupView
                    message={`Add ${displayName} as a friend?`}
                    handleYesClick={handleAddClick}
                    handleNoClick={() => setConfirmAddPopupIsVisible(false)}
                />
            )}
        </>
    );
};

export default FriendOfFriendCard;