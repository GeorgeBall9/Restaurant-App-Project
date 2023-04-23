import "./CheckInsCollage.css";

import CustomCollage from "./CustomCollage/CustomCollage.jsx";
import { useState, useEffect } from "react";
import { faArrowLeft, faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CheckInsCollage = ({ restaurant, onClose }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    const demoPhotos = [
        { src: "https://picsum.photos/id/1011/600/400", alt: "Photo 1" },
        { src: "https://picsum.photos/id/1012/600/400", alt: "Photo 2" },
        { src: "https://picsum.photos/id/1013/600/400", alt: "Photo 3" },
        { src: "https://picsum.photos/id/1014/600/400", alt: "Photo 4" },
        { src: "https://picsum.photos/id/1015/600/400", alt: "Photo 5" },
        { src: "https://picsum.photos/id/1016/600/400", alt: "Photo 6" },
        { src: "https://picsum.photos/id/1010/600/400", alt: "Photo 7" },
        { src: "https://picsum.photos/id/1018/600/400", alt: "Photo 8" },
        { src: "https://picsum.photos/id/1019/600/400", alt: "Photo 9" },
        { src: "https://picsum.photos/id/1020/600/400", alt: "Photo 10" },
        { src: "https://picsum.photos/id/1021/600/400", alt: "Photo 11" },
        { src: "https://picsum.photos/id/1022/600/400", alt: "Photo 11" },
    ];

    const handleBackClick = () => {
        setIsVisible(false);
        setTimeout(() => {
            onClose();
        }, 300);
    };

    const handleExpand = () => {
        setIsExpanded(true);
    };

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <div className={`collage-popup ${isVisible ? "visible" : ""} ${isExpanded ? "expanded" : ""}`}>
            <div className={`collage-popup-header ${isExpanded ? "collage-haeder-sticky" : ""}`}>
                <button onClick={handleBackClick}>
                    <FontAwesomeIcon className="icon" icon={faArrowLeft} />
                    Back
                </button>
                <h2>{restaurant.name}</h2>
                <div className="collage-popup-function">
                    <button><FontAwesomeIcon className="icon" icon={faImage} /> </button>
                </div>
            </div>
            {/* Render the collage of photos using CustomCollage */}
            <div className={`collage-popup-photos ${isExpanded ? "collage-popup-photos-expanded" : ""}`}>
                <CustomCollage images={demoPhotos} rows={isExpanded ? 100 : 2} columns={isExpanded ? 2 : 2} onExpand={handleExpand} />
            </div>


        </div>
    );
};

export default CheckInsCollage;
