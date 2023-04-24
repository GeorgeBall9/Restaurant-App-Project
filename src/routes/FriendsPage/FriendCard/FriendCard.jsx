import "./FriendCard.css";
import FriendInfo from "./FriendInfo/FriendInfo";
import ActionButtons from "./ActionButtons/ActionButtons";

const FriendCard = ({displayName, iconColour, status, button1Handler, button1Text, button2Handler, button2Text}) => {
    return (
        <div className="friend-card">
            <FriendInfo displayName={displayName} iconColour={iconColour} status={status}/>

            {status !== "pending" && (
                <ActionButtons
                    button1Handler={button1Handler}
                    button1Text={button1Text}
                    button2Handler={button2Handler}
                    button2Text={button2Text}
                />
            )}
        </div>
    );
};

export default FriendCard;