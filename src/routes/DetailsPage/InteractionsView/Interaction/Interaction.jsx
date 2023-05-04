import "./Interaction.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const Interaction = ({count, icon}) => {
    return (
        <div className="interaction-container">
            <FontAwesomeIcon icon={icon} className="icon"/>
            {count || "0"}
        </div>
    );
};

export default Interaction;