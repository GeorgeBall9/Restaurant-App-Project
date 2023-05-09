import "./CustomCollage.css";
import {faCircleCheck, faCirclePlus, faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useEffect, useState} from "react";
import PrimaryButton from "../ButtonViews/PrimaryButton/PrimaryButton";
import InversePrimaryButton from "../ButtonViews/InversePrimaryButton/InversePrimaryButton";
import CollageImage from "./CollageImage/CollageImage";

const CustomCollage = ({
                           images,
                           rows,
                           columns,
                           handleAddClick,
                           addFunctionality = true,
                           selectMode = false,
                           handleDeleteSelected
                       }) => {

    const [allImages, setAllImages] = useState(images);
    const [selectedImages, setSelectedImages] = useState([]);
    const [selectButtonText, setSelectButtonText] = useState("Select all");
    const [fullScreenImage, setFullScreenImage] = useState(null);

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

    const handleFullScreenClick = (image) => {
        setFullScreenImage(image);
    };

    const closeFullScreenPhoto = () => {
        setFullScreenImage("");
    };

    const handleSelectAllClick = () => {
        if (selectButtonText === "Select all") {
            setSelectedImages([...images]);
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

    const handleDeleteClick = async () => {
        await handleDeleteSelected(selectedImages);
        setSelectedImages([]);
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
                className="collage-container"
                style={{gridTemplateRows: `repeat(${rows}, 1fr)`, gridTemplateColumns: `repeat(${columns}, 1fr)`}}
            >
                {addFunctionality && !selectMode && (
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
                            onClick={() => {
                                handleImageClick(image);
                                if (!selectMode) {
                                    handleFullScreenClick(image);
                                }
                            }}
                        >
                            <CollageImage {...image} />

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

                {fullScreenImage && (
                    <div className="full-screen-image-wrapper" onClick={closeFullScreenPhoto}>
                        <img src={fullScreenImage.url} alt="Full screen check-in image"/>
                    </div>
                )}
            </div>
        </>
    );
};

export default CustomCollage;
