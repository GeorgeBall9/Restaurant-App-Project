import "./WebsiteView.css";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowUpRightFromSquare} from "@fortawesome/free-solid-svg-icons";

const WebsiteView = ({url, domainName}) => {
    return (
        <div className="website-view">
            <h2>Website</h2>

            <Link to={url}>
                {domainName}
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="icon"/>
            </Link>
        </div>
    );
};

export default WebsiteView;