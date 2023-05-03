/*
Description: SearchFeedback component
Author: George Ball
Contact: georgeball14@hotmail.com
*/

import "./SearchFeedback.css";
import {useEffect, useState} from "react";

const SearchFeedback = () => {

    const [style, setStyle] = useState({opacity: 0});

    const updateStyle = (opacity) => {
        setStyle(style => {
            const updatedStyle = {...style};
            updatedStyle.opacity = opacity;
            return updatedStyle;
        });
    };

    useEffect(() => {
        updateStyle(1);

        setTimeout(() => updateStyle(0), 1500);
    }, []);

    return (
        <div className="no-matches-container" style={style}>
            <p className="no-matches-message">Oops! We didn't find a match</p>

            <p className="try-something-else-message">
                Why not try searching for something else?
            </p>
        </div>
    );
};

export default SearchFeedback;