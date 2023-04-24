import "./FriendCard.css";
import FriendInfo from "./FriendInfo/FriendInfo";
import ActionButtons from "./ActionButtons/ActionButtons";

const FriendCard = ({id, displayName, iconColour, button1Handler, button1Text, button2Handler, button2Text}) => {
    return (
        <div key={id} className="friend-card">
            <FriendInfo displayName={displayName} iconColour={iconColour}/>

            <ActionButtons
                button1Handler={button1Handler}
                button1Text={button1Text}
                button2Handler={button2Handler}
                button2Text={button2Text}
            />
        </div>
    );
};

export default FriendCard;