import "./AboutView.css";
import {useState} from "react";

const AboutView = ({description}) => {

    const [isExpanded, setIsExpanded] = useState(false);
    const [toggleLabel, setToggleLabel] = useState('Read More');

    const handleToggleDescription = () => {
        setIsExpanded(!isExpanded);
        setToggleLabel(isExpanded ? 'Read More' : 'Read Less');
    };

    return (
        <div className="about-view">
            <h2>About</h2>

            <p>
                {description ? (
                    isExpanded ? (
                        description
                    ) : (
                        description.slice(0, 200) + (description.length > 100 ? '...' : '')
                    )
                ) : (
                    'No description available.'
                )}
            </p>

            {description.length > 200 && (
                <button
                    className="read-more-button"
                    onClick={handleToggleDescription}
                >
                    {toggleLabel}
                </button>
            )}
        </div>
    );
};

export default AboutView;