// FriendContributionsButton.js
import "../../../ProfilePage/ContributionsButton/ContributionsButton.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const FriendContributionsButton = ({ userId, route, icon, name }) => {
    const parsedRoute = route.replace(":userId", userId);

    return (
        <Link to={parsedRoute}>
            <FontAwesomeIcon className="icon" icon={icon} />
            {name}
        </Link>
    );
};

export default FriendContributionsButton;