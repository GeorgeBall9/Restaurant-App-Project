import "./CustomCollage.css";
import {faCirclePlus} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const CustomCollage = ({images, rows, columns, isExpanded, onExpand, handleAddClick, addFunctionality = true}) => {
    const showMore = images.length > rows * columns;
    const image4 = images[rows * columns - 1];
    const remainingImages = showMore ? images.length - rows * columns : 0;

    console.log("custom collage", {images})

    return (
        <div
            className="collage-container"
            style={{gridTemplateRows: `repeat(${rows}, 1fr)`, gridTemplateColumns: `repeat(${columns}, 1fr)`}}
        >
            {addFunctionality && isExpanded && (
                <button className="add-photo-button" onClick={handleAddClick}>
                    <FontAwesomeIcon className="icon" icon={faCirclePlus}/>
                </button>
            )}

            {images && images
                .slice(0, rows * columns - 1)
                .map((image, index) => (
                    <img key={index} src={image.src} alt={image.alt} className="collage-image"/>
                ))
            }

            {image4 && (
                <div className="collage-image-wrapper">
                    <img
                        src={image4.src}
                        alt={image4.alt}
                        className="collage-image"
                    />

                    {showMore && (
                        <div className="collage-image-overlay" onClick={onExpand}>
                            Show more +{remainingImages}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default CustomCollage;
