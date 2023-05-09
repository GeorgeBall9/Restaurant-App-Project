import "./VoteButton.css";
import {faCircleUp as faSolidCircleUp} from "@fortawesome/free-solid-svg-icons";
import {faCircleUp} from "@fortawesome/free-regular-svg-icons";
import InteractionButton from "../../../buttonViews/InteractionButton/InteractionButton";

const VoteButton = ({isSolid, handleClick}) => {
    return (
        <InteractionButton
            icon={faCircleUp}
            solidIcon={faSolidCircleUp}
            isSolid={isSolid}
            handleClick={handleClick}
        />
    );
};

export default VoteButton;