import "./ClosedSign.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBan} from "@fortawesome/free-solid-svg-icons";

const ClosedSign = () => {
    return (
        <div className="closed-sign">
            Closed
            <FontAwesomeIcon className="icon" icon={faBan}/>
        </div>
    );
};

export default ClosedSign;