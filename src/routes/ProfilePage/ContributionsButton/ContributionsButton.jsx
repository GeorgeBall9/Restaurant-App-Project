import "./ContributionsButton.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link} from "react-router-dom";

const ContributionsButton = ({route, icon, name}) => {
    return (
        <Link to={route}>
            <FontAwesomeIcon className="icon" icon={icon}/>
            {name}
        </Link>
    );
};

export default ContributionsButton;