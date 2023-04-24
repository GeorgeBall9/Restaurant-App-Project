import "./FriendInfo.css";
import UserIcon from "../../../../common/components/UserIcon/UserIcon";
import ActionButton from "../ActionButtons/ActionButton/ActionButton";

const FriendInfo = ({iconColour, displayName, status}) => {
    return (
        <div className="friend-info">
            <UserIcon size="larger" colour={iconColour}/>

            <div className="info-container">
                <h3>{displayName}</h3>
                <p>6 mutual friends</p>

                {status === "pending" && <ActionButton text="Cancel request" className="cancel-request-button"/>}
            </div>
        </div>
    );
};

export default FriendInfo;