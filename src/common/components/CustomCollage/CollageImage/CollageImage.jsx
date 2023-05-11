/*
Description: Collage image component for use inside the custom collage component
Author: Ryan Henzell-Hill
Contact: ryan.henzell-hill@outlook.com
*/

// stylesheet
import './CollageImage.css';

// react imports
import {useState} from "react";

// CollageImage component
const CollageImage = ({url, alt}) => {

    // check if img is loaded in state
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