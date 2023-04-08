import "./AdditionalDetail.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const AdditionalDetail = ({icon, name, content}) => {
    return (
        <div className="additional-detail">
            <FontAwesomeIcon icon={icon}/>
            <span>{name}</span>
            <p>{content}</p>
        </div>
    );
};

export default AdditionalDetail;