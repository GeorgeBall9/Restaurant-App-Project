import "./NoResults.css";
import TacoCharacter from "../../images/errorImage.png";

const NoResults = ({ mainText, subText }) => {
    return (
        <div className="no-results">
            <img src={TacoCharacter} alt="Taco-character" className="no-results-image" />
            <div className="no-results-text-main-text">{mainText}</div>
            {subText && <div className="no-results-text-sub-text">{subText}</div>}
        </div>
    );
};

export default NoResults;