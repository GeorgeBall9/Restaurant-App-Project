import "./Banner.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft} from "@fortawesome/free-solid-svg-icons";
import BookmarkButton from "../../../common/components/BookmarkButton/BookmarkButton";
import {faShareFromSquare} from "@fortawesome/free-regular-svg-icons";
import {useNavigate} from "react-router-dom";
import Shaders from "mapbox-gl/src/shaders/shaders";
import ShareButton from "./ShareButton/ShareButton";

const Banner = ({id, scrollPosition}) => {

    const navigate = useNavigate();

    const style = scrollPosition > 20
        ? {position: 'fixed', backgroundColor: 'rgba(224,220,220,0.9)'}
        : {position: 'absolute', backgroundColor: 'transparent'};

    const bannerButtonsStyle = scrollPosition > 20
        ? {color: "#C23B22"}
        : {color: "white"};

    return (
        <div className="banner container" style={style}>
            <button className="back-button" onClick={() => navigate(-1)} style={bannerButtonsStyle}>
                <FontAwesomeIcon icon={faChevronLeft} className="icon" style={bannerButtonsStyle}/>
                Back
            </button>

            <div className="action-button-container">
                <BookmarkButton id={id} style={bannerButtonsStyle}/>

                <ShareButton style={bannerButtonsStyle}/>
            </div>
        </div>
    );
};

export default Banner;