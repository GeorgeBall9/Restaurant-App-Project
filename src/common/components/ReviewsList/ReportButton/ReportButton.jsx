import "./ReportButton.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFlag as faSolidFlag} from "@fortawesome/free-solid-svg-icons";
import {faFlag} from "@fortawesome/free-regular-svg-icons";
import {useState} from "react";

const ReportButton = ({reviewId}) => {
    const [reported, setReported] = useState(false);

    const handleClick = () => {
        setReported(true);
    };

    return (
        <button className="report-button" onClick={handleClick}>
            <FontAwesomeIcon icon={reported ? faSolidFlag : faFlag} className="report-icon"/>
        </button>
    );
};

export default ReportButton;