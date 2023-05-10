import './CollageImage.css';

import {useState} from "react";

const CollageImage = ({url, alt}) => {

    const [loaded, setLoaded] = useState(false);

    return (
        <img
            style={{visibility: loaded ? "visible" : "hidden"}}
            src={url}
            alt={alt}
            className="collage-image"
            onLoad={() => setLoaded(true)}
        />
    );
};

export default CollageImage;