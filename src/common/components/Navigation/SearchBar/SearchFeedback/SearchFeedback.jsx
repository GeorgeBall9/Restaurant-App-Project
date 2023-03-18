import React, { useState, useEffect } from "react";
import "./SearchFeedback.css";


const SearchFeedback = ({ hasMatches, searchQuery }) => {
    // Add a state for the visibility of the no-matches-container
    const [noMatchesVisible, setNoMatchesVisible] = useState(false);


     // Use the useEffect hook to handle the fadeout effect
    useEffect(() => {
        if (!hasMatches && searchQuery.length > 0 && !noMatchesVisible) {
            setNoMatchesVisible(true);

            const timeout = setTimeout(() => {
                setNoMatchesVisible(false);
            }, 4000); // The fadeout duration can be adjusted

            return () => clearTimeout(timeout);
        }
    }, [hasMatches, searchQuery, noMatchesVisible]);


    return (
    <div className={`no-matches-container ${noMatchesVisible ? "" : "fade-out"}`}>
        <p className="no-matches-message">Oops! We didn't find a match</p>
        <p className="try-something-else-message">Why not try searching for something else?</p>
    </div>
    );
};

export default SearchFeedback;