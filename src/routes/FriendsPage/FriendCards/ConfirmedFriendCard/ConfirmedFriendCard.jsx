import FriendCard from "../FriendCard/FriendCard";
import {deleteFriend, getUserFromUserId} from "../../../../firebase/firebase";
import {removeFriend, selectUserId, setDisplayedFriend} from "../../../../features/user/userSlice";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

const ConfirmedFriendCard = ({id, displayName, iconColour, profilePhotoUrl, mutualFriends}) => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const userId = useSelector(selectUserId);

    const handleProfileClick = async () => {
        const friendData = await getUserFromUserId(id);
        dispatch(setDisplayedFriend(friendData))
        navigate(`/view-profile/${id}`);
    };

    const handleRemoveClick = async (id) => {
        console.log("show remove friend confirmation popup");
        await deleteFriend(userId, id);
        dispatch(removeFriend(id));
    };

    return (
        <FriendCard
            displayName={displayName}
            iconColour={iconColour}
            profilePhotoUrl={profilePhotoUrl}
            mutualFriends={mutualFriends}
            status="confirmed"
            button1Handler={handleProfileClick}
            button1Text="Profile"
            button2Handler={handleRemoveClick}
            button2Text="Remove"
        />
    );
};

export default ConfirmedFriendCard;