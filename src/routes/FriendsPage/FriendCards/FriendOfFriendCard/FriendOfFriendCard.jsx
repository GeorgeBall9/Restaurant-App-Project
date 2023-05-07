import FriendCard from "../FriendCard/FriendCard";
import ConfirmationPopupView from "../../../../common/components/ConfirmationPopupView/ConfirmationPopupView";
import {useState} from "react";

const FriendOfFriendCard = ({displayName, iconColour, profilePhotoUrl, mutualFriends, handleAddClick}) => {

    const [confirmAddPopupIsVisible, setConfirmAddPopupIsVisible] = useState(false);

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