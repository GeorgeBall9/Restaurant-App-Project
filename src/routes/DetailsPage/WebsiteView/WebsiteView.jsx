import "./WebsiteView.css";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowUpRightFromSquare} from "@fortawesome/free-solid-svg-icons";

const WebsiteView = ({url}) => {

    const getDomainName = (url) => {
        try {
            const {hostname} = new URL(url);
            return hostname;
        } catch (error) {
            console.error('Error parsing URL', error);
            return url;
        }
    };

    return (
        <div className="website-view">
            <h2>Website</h2>

            <Link to={url}>
                {getDomainName(url)}
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="icon"/>
            </Link>
        </div>
    );
};

export default WebsiteView;