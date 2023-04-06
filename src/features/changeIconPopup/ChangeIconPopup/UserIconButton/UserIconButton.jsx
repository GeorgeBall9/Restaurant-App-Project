import "./UserIconButton.css";
import UserIcon from "../../../../common/components/UserIcon/UserIcon";

const UserIconButton = ({colour, selected, index, handleClick}) => {
    return (
        <button className={selected ? "selected" : ""} onClick={() => handleClick(index)}>
            <UserIcon size="large" colour={colour}/>
        </button>
    );
};

export default UserIconButton;