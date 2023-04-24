import "./FriendInfo.css";
import UserIcon from "../../../common/components/UserIcon/UserIcon";

const FriendInfo = ({iconColour, displayName}) => {
    return (
        <div>
            <UserIcon size="larger" colour={iconColour}/>

            <div className="info-container">
                <h3>{displayName}</h3>
                <p>6 mutual friends</p>
            </div>
        </div>
    );
};

export default FriendInfo;