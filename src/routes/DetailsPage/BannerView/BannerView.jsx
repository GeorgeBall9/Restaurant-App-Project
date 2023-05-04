import "./BannerView.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import BookmarkButton from "../../../common/components/BookmarkButton/BookmarkButton";
import ShareButton from "./ShareButton/ShareButton";
import {forwardRef} from "react";
import RecommendButton from "./RecommendButton/RecommendButton";
import {deselectReview} from "../../../features/reviews/reviewsSlice";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";

const BannerView = forwardRef((props, ref) => {

    const {restaurant, scrollPosition, showName} = props;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const style = scrollPosition > 20
        ? {position: 'fixed', backgroundColor: '#4c4c4c'}
        : {position: 'absolute', backgroundColor: 'transparent'};

    const bannerButtonsStyle = scrollPosition > 20
        ? {color: "#F49D1A"}
        : {color: "white"};

    const handleBackClick = () => {
        dispatch(deselectReview());
        navigate("/");
    };

    return (
        <div id="banner" ref={ref} className="banner container" style={style}>
            <button className="back-button" onClick={handleBackClick} style={bannerButtonsStyle}>
                <FontAwesomeIcon icon={faArrowLeft} className="icon" style={bannerButtonsStyle}/>
                Back
            </button>

            <h1 style={{opacity: showName ? 1 : 0}}>{restaurant?.name}</h1>

            <div className="action-button-container">
                <RecommendButton restaurant={restaurant} style={bannerButtonsStyle}/>

                <BookmarkButton restaurant={restaurant} style={bannerButtonsStyle}/>

                <ShareButton id={restaurant?.id} style={bannerButtonsStyle}/>
            </div>
        </div>
    );
});

export default BannerView;