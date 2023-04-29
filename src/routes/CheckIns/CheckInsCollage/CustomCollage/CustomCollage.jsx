import "./CustomCollage.css";
import {faCircleCheck, faCirclePlus, faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useEffect, useState} from "react";
import PrimaryButton from "../../../../common/components/PrimaryButton/PrimaryButton";
import InversePrimaryButton from "../../../../common/components/InversePrimaryButton/InversePrimaryButton";

const CustomCollage = ({
                           images,
                           rows,
                           columns,
                           isExpanded,
                           onExpand,
                           handleAddClick,
                           addFunctionality = true,
                           selectMode = false,
                           handleImageSelected
                       }) => {

    const showMore = images.length > rows * columns;
    const image4 = images[rows * columns - 1];
    const remainingImages = showMore ? images.length - rows * columns : 0;

    const [selectedImages, setSelectedImages] = useState([]);
    const [selectButtonText, setSelectButtonText] = useState("Select all");

    useEffect(() => {
        if (!selectMode) {
            setSelectedImages([]);
        }
    }, [selectMode]);

    const handleImageClick = ({alt}) => {
        if (selectedImages.includes(alt)) {
            setSelectedImages(selectedImages => selectedImages.filter(imageAlt => imageAlt !== alt));
        } else {
            setSelectedImages([...selectedImages, alt]);
        }
    };

    const handleSelectAllClick = () => {
        if (selectButtonText === "Select all") {
            setSelectedImages(images.map(({alt}) => alt));
        } else {
            setSelectedImages([]);
        }
    };

    useEffect(() => {
        if (selectedImages.length === images.length) {
            setSelectButtonText("Deselect all");
        } else {
            setSelectButtonText("Select all");
        }
    }, [selectedImages]);

    return (
        <>
            {selectMode && (
                <div className="container selection-header">
                    <PrimaryButton
                        handleClick={handleSelectAllClick}
                        text={selectButtonText}
                        size="small"
                    />

                    <h3>{selectedImages.length} image{selectedImages.length === 1 ? "" : "s"} selected</h3>

                    <InversePrimaryButton text="Delete" icon={faTrash} size="small"/>
                </div>
            )}

            <div
                className="collage-container"
                style={{gridTemplateRows: `repeat(${rows}, 1fr)`, gridTemplateColumns: `repeat(${columns}, 1fr)`}}
            >
                {addFunctionality && isExpanded && !selectMode && (
                    <button className="add-photo-button" onClick={handleAddClick}>
                        <FontAwesomeIcon className="icon" icon={faCirclePlus}/>
                    </button>
                )}

                {images && images
                    .slice(0, rows * columns - 1)
                    .map((image, index) => (
                        <div
                            key={index}
                            className={`collage-image-wrapper ${selectMode ? "clickable" : ""}`}
                            onClick={() => handleImageClick(image)}
                        >
                            <img src={image.src} alt={image.alt} className="collage-image"/>

                            {selectMode && (
                                <button
                                    className={`select-image-button 
                                    ${selectedImages.includes(image.alt) ?
                                        "selected"
                                        :
                                        ""}`
                                    }
                                >
                                    <FontAwesomeIcon className="icon" icon={faCircleCheck}/>
                                </button>
                            )}
                        </div>
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
        </>
    );
};

export default CustomCollage;
