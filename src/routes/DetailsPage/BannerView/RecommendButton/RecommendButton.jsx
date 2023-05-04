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
import InteractionButton from "../../../../common/components/InteractionButton/InteractionButton";
import {addUserRecommendation, removeUserRecommendation} from "../../../../firebase/firebase";

const RecommendButton = ({restaurant, style}) => {

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
        } else {
            setConfirmationIsVisible(true);
        }
    };

    const handleYesClick = async () => {
        setConfirmationIsVisible(false);

        if (isRecommended) {
            dispatch(removeRecommendation(id));
            await removeUserRecommendation(userId, id);
        } else {
            dispatch(addRecommendation(id));
            await addUserRecommendation(userId, restaurant);
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

            <div className="bookmark-feedback" style={{opacity: feedbackIsVisible ? 1 : 0}}>
                {isRecommended ? "Added " : "Removed "}recommendation
                <FontAwesomeIcon icon={isRecommended ? faCircleCheck : faXmark} className="bookmark-feedback-icon"/>
            </div>
        </>
    );
};

export default RecommendButton;