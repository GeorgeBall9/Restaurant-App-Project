import "./InteractionsView.css";
import {faBookmark, faCheckCircle, faHeart} from "@fortawesome/free-regular-svg-icons";
import Interaction from "./Interaction/Interaction";
import {useSelector} from "react-redux";
import {
    selectBookmarkInteractions, selectCheckInInteractions,
    selectRecommendationInteractions
} from "../../../features/interactions/interactionsSlice";

const InteractionsView = () => {

    const recommendations = useSelector(selectRecommendationInteractions);
    const bookmarks = useSelector(selectBookmarkInteractions);
    const checkIns = useSelector(selectCheckInInteractions);

    return (
        <div className="interactions-view">
            <h2>Interactions</h2>

            <div>
                <Interaction count={recommendations} icon={faHeart}/>

                <Interaction count={bookmarks} icon={faBookmark}/>

                <Interaction count={checkIns} icon={faCheckCircle}/>
            </div>
        </div>
    );
};

export default InteractionsView;