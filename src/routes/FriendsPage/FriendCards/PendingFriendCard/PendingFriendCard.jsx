import FriendCard from "../FriendCard/FriendCard";
import {cancelFriendRequest} from "../../../../firebase/firebase";
import {selectUserId, setFriends} from "../../../../features/user/userSlice";
import {useDispatch, useSelector} from "react-redux";

const PendingFriendCard = ({id, displayName, iconColour, profilePhotoUrl, mutualFriends}) => {

    const dispatch = useDispatch();

    const userId = useSelector(selectUserId);

    const handleCancelClick = async () => {
        const updatedFriends = await cancelFriendRequest(userId, id);
        dispatch(setFriends(updatedFriends));
    };

    return (
        <FriendCard
            displayName={displayName}
            iconColour={iconColour}
            profilePhotoUrl={profilePhotoUrl}
            mutualFriends={mutualFriends}
            status="pending"
            handleCancelClick={handleCancelClick}
        />
    );
};

export default PendingFriendCard;