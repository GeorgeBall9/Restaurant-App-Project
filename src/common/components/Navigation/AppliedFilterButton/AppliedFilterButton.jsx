import "./AppliedFilterButton.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";

const AppliedFilterButton = ({type, filter}) => {
    return (
        <div className="filter-selected">
            <button className="close-button">
                <FontAwesomeIcon className="icon" icon={faXmark}/>
            </button>

            {filter}
        </div>
    );
};

export default AppliedFilterButton;