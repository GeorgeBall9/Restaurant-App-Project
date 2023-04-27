import React from "react";
import "./CustomCollage.css";

const CustomCollage = ({ images, rows, columns, onExpand }) => {
    const imageElements = images.slice(0, rows * columns - 1).map((image, index) => (
        <img key={index} src={image.src} alt={image.alt} className="collage-image" />
    ));

    const showMore = images.length > rows * columns;
    const remainingImages = showMore ? images.length - rows * columns + 1 : 0;

    return (
        <div
            className="collage-container"
            style={{ gridTemplateRows: `repeat(${rows}, 1fr)`, gridTemplateColumns: `repeat(${columns}, 1fr)` }}
        >
            {imageElements}
            {showMore && (
                <div className="collage-image-wrapper">
                    <img src={images[rows * columns - 1].src} alt={images[rows * columns - 1].alt} className="collage-image" />
                    <div className="collage-image-overlay" onClick={onExpand}>
                        Show more +{remainingImages}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CustomCollage;
