import FormField from "../../../common/components/FormField/FormField";
import PrimaryButton from "../../../common/components/PrimaryButton/PrimaryButton";
import SecondaryButton from "../../../common/components/SecondaryButton/SecondaryButton";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectFriendRequests, selectFriends, selectUserId, setFriends} from "../../../features/user/userSlice";
import {getUserFromUserId, sendFriendRequestToUser} from "../../../firebase/firebase";

const AddFriendPopupView = ({handleNoClick, closePopup}) => {

    const dispatch = useDispatch();

    const userId = useSelector(selectUserId);
    const friends = useSelector(selectFriends);
    const friendRequests = useSelector(selectFriendRequests);

    const [addFriendId, setAddFriendId] = useState("");
    const [feedback, setFeedback] = useState("");
    const [foundUser, setFoundUser] = useState(null);

    const handleYesClick = async () => {
        const updatedFriends = await sendFriendRequestToUser(userId, addFriendId);
        dispatch(setFriends(updatedFriends));
        setAddFriendId("");
        closePopup();
    };

    const handleFindUserClick = async (addFriendId) => {
        if (!addFriendId) {
            setFeedback("Please enter a user ID");
        } else if (addFriendId === userId) {
            setFeedback("You cannot add yourself as a friend");
        } else if (friends.some(friend => friend.id === addFriendId)) {
            setFeedback("You are already friends with this user");
        } else if (friendRequests.includes(addFriendId)) {
            setFeedback("You are already have a friend request from this user");
        } else {
            const user = await getUserFromUserId(addFriendId);

            if (!user) {
                setFeedback("No user was found with that ID");
            } else if (user?.id !== userId) {
                setFoundUser(user);
            }
        }
    };

    return (
        <div className="confirm-checkin-popup">
            {feedback && (
                <p className="feedback">{feedback}</p>
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
                    <PrimaryButton handleClick={handleYesClick} text="Yes"/>
                    <SecondaryButton handleClick={handleNoClick} text="No"/>
                </div>
            )}
        </div>
    );
};

export default AddFriendPopupView;