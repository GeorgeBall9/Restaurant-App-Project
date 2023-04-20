import "./Banner.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft} from "@fortawesome/free-solid-svg-icons";
import BookmarkButton from "../../../common/components/BookmarkButton/BookmarkButton";
import {useNavigate} from "react-router-dom";
import ShareButton from "./ShareButton/ShareButton";
import {deselectReview} from "../../../features/reviews/reviewsSlice";
import {useDispatch} from "react-redux";
import {useEffect, useRef} from "react";

const Banner = ({restaurant, scrollPosition, setNavTopPosition}) => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const ref = useRef(null);

    useEffect(() => {
        if (!ref) return;

        setNavTopPosition(ref.current.offsetHeight);
    }, [ref]);

    const style = scrollPosition > 20
        ? {position: 'fixed', backgroundColor: 'white'}
        : {position: 'absolute', backgroundColor: 'transparent'};

    const bannerButtonsStyle = scrollPosition > 20
        ? {color: "#C23B22"}
        : {color: "white"};

    const handleBackClick = () => {
        dispatch(deselectReview());
        navigate("/");
    };

    return (
        <div ref={ref} className="banner container" style={style}>
            <button className="back-button" onClick={handleBackClick} style={bannerButtonsStyle}>
                <FontAwesomeIcon icon={faChevronLeft} className="icon" style={bannerButtonsStyle}/>
                Back
            </button>

            <div className="action-button-container">
                <BookmarkButton restaurant={restaurant} style={bannerButtonsStyle}/>

                <ShareButton id={restaurant?.id} style={bannerButtonsStyle}/>
            </div>
        </div>
    );
};

export default Banner;