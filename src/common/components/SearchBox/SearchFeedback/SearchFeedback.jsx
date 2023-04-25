/*
Description: SearchFeedback component
Author: George Ball
Contact: georgeball14@hotmail.com
*/


import "./SearchFeedback.css";

import React, { useState, useEffect } from "react";

const SearchFeedback = ({hasMatches, searchQuery}) => {
    // Add a state for the visibility of the no-matches-container
    const [noMatchesVisible, setNoMatchesVisible] = useState(false);

    // Use the useEffect hook to handle the fadeout effect
    useEffect(() => {
        if (!hasMatches && searchQuery?.length > 0) {
            setNoMatchesVisible(true);
        } else if (hasMatches || searchQuery?.length === 0) {
            setNoMatchesVisible(false);
        }
    }, [hasMatches, searchQuery]);

    return (
        <div className={`no-matches-container ${noMatchesVisible ? "fade-in" : "fade-out"}`}>
            <p className="no-matches-message">Oops! We didn't find a match</p>
            <p className="try-something-else-message">
                Why not try searching for something else?
            </p>
        </div>
    );
};

export default SearchFeedback;