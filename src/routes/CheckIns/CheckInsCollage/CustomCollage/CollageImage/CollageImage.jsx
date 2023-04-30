const CollageImage = ({id, url, alt, loadHandler}) => {
    return (
        <img
            src={url}
            alt={alt}
            className="collage-image"
            onLoad={() => loadHandler(id)}
        />
    );
};

export default CollageImage;