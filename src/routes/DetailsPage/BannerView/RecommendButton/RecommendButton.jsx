import "./RecommendButton.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart as faSolidHeart, faXmark} from "@fortawesome/free-solid-svg-icons";
import {faCircleCheck, faHeart} from "@fortawesome/free-regular-svg-icons";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {
    addRecommendation,
    removeRecommendation,
    selectRecommendations,
    selectUserId
} from "../../../../features/user/userSlice";
import {useEffect, useState} from "react";
import InteractionButton from "../../../../common/components/ButtonViews/InteractionButton/InteractionButton";
import {addUserRecommendation, removeUserRecommendation} from "../../../../firebase/firebase";
import InteractionFeedback from "../../../../common/components/InteractionFeedback/InteractionFeedback";

const RecommendButton = ({restaurant, style, updateInteractions}) => {

    const id = restaurant?.id;

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const userId = useSelector(selectUserId);
    const recommendations = useSelector(selectRecommendations);

    const [isRecommended, setIsRecommended] = useState(false);
    const [confirmationIsVisible, setConfirmationIsVisible] = useState(false);
    const [feedbackIsVisible, setFeedbackIsVisible] = useState(false);

    useEffect(() => {
        if (!restaurant || !recommendations) return;

        setIsRecommended(recommendations.some(recommendation => recommendation === id));
    }, [restaurant, recommendations]);

    const handleRecommendClick = () => {
        if (!userId) {
            navigate("/sign-in");
        } else if (!feedbackIsVisible) {
            setConfirmationIsVisible(true);
        }
    };

    const handleYesClick = async () => {
        setConfirmationIsVisible(false);

        if (isRecommended) {
            dispatch(removeRecommendation(id));
            await removeUserRecommendation(userId, id);
            updateInteractions("recommendations", -1);
        } else {
            dispatch(addRecommendation(id));
            await addUserRecommendation(userId, restaurant);
            updateInteractions("recommendations", 1);
        }

        setFeedbackIsVisible(true);
        setTimeout(() => setFeedbackIsVisible(false), 2000);
    };

    return (
        <>
            <InteractionButton
                icon={faHeart}
                solidIcon={faSolidHeart}
                isSolid={isRecommended}
                handleClick={handleRecommendClick}
                style={style}
            />

            {confirmationIsVisible && (
                <div className="confirm-checkin-popup">
                    <p>
                        {isRecommended
                            ? "Remove recommendation for "
                            :
                            "Recommend "}
                        {restaurant?.name}?
                    </p>

                    <div className="buttons-container">
                        <button onClick={handleYesClick}>Yes</button>
                        <button onClick={() => setConfirmationIsVisible(false)}>No</button>
                    </div>
                </div>
            )}

            <InteractionFeedback
                isVisible={feedbackIsVisible}
                change={isRecommended ? "Added" : "Removed"}
                interaction={"recommendation"}
            />
        </>
    );
};

export default RecommendButton;