import "./CustomCollage.css";
import {faCircleCheck, faCirclePlus, faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useEffect, useState} from "react";
import PrimaryButton from "../../../../common/components/PrimaryButton/PrimaryButton";
import InversePrimaryButton from "../../../../common/components/InversePrimaryButton/InversePrimaryButton";
import CollageImage from "./CollageImage/CollageImage";

const CustomCollage = ({
                           images,
                           rows,
                           columns,
                           isExpanded,
                           onExpand,
                           handleAddClick,
                           addFunctionality = true,
                           selectMode = false,
                           handleDeleteSelected
                       }) => {

    const showMore = images.length > rows * columns;
    const image4 = images[rows * columns - 1];
    const remainingImages = showMore ? images.length - rows * columns : 0;

    const [allImages, setAllImages] = useState(images);
    const [selectedImages, setSelectedImages] = useState([]);
    const [selectButtonText, setSelectButtonText] = useState("Select all");

    useEffect(() => {
        setAllImages(images);
    }, [images]);

    useEffect(() => {
        if (!selectMode) {
            setSelectedImages([]);
        }
    }, [selectMode]);

    const handleImageClick = (image) => {
        if (selectedImages.some(({id}) => id === image.id)) {
            setSelectedImages(selectedImages => selectedImages
                .filter(({id}) => id !== image.id));
        } else {
            setSelectedImages([...selectedImages, image]);
        }
    };

    const handleSelectAllClick = () => {
        if (selectButtonText === "Select all") {
            setSelectedImages([...images]);
        } else {
            setSelectedImages([]);
        }
    };

    useEffect(() => {
        if (!isExpanded) return;

        if (selectedImages.length === images.length) {
            setSelectButtonText("Deselect all");
        } else {
            setSelectButtonText("Select all");
        }
    }, [selectedImages]);

    const handleDeleteClick = () => {
        handleDeleteSelected(selectedImages);
    };

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

                    <InversePrimaryButton
                        handleClick={handleDeleteClick}
                        text="Delete"
                        icon={faTrash}
                        size="small"
                    />
                </div>
            )}

            <div
                className={`collage-container ${isExpanded ? "" : "non-expanded"}`}
                style={{gridTemplateRows: `repeat(${rows}, 1fr)`, gridTemplateColumns: `repeat(${columns}, 1fr)`}}
            >
                {addFunctionality && isExpanded && !selectMode && (
                    <button className="add-photo-button" onClick={handleAddClick}>
                        <FontAwesomeIcon className="icon" icon={faCirclePlus}/>
                    </button>
                )}

                {allImages && allImages
                    .slice(0, rows * columns - 1)
                    .map(image => (
                        <div
                            key={image.id}
                            className={`collage-image-wrapper ${selectMode ? "clickable" : ""}`}
                            onClick={() => handleImageClick(image)}
                        >
                            <CollageImage {...image}/>

                            {selectMode && (
                                <button
                                    className={`select-image-button 
                                    ${selectedImages.some(({alt}) => alt === image.alt) ?
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
                        <CollageImage {...image4}/>

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
