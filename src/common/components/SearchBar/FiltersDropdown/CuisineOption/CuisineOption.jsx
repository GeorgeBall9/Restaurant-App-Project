import "./CuisineOption.css";
import {
    faUtensils,
    faGlassMartini,
    faBurger,
    faBeerMugEmpty,
    faPizzaSlice,
    faPepperHot,
    faBowlFood,
    faBowlRice
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import EuropeanImageSrc from "../../../../images/icons-yellow/European.png";
import JapaneseImageSrc from "../../../../images/icons-yellow/Japanese.png";
import MexicanImageSrc from "../../../../images/icons-yellow/Mexican.png";
import SpanishImageSrc from "../../../../images/icons-yellow/Spanish.png";
import SteakImageSrc from "../../../../images/icons-yellow/Steak.png";
import SushiImageSrc from "../../../../images/icons-yellow/Sushi.png";
import ThaiImageSrc from "../../../../images/icons-yellow/Thai.png";

const iconsMap = {
    British: faUtensils,
    Chinese: faBowlRice,
    Burger: faBurger,
    Indian: faPepperHot,
    Italian: faPizzaSlice,
    Pizza: faPizzaSlice,
    Pub: faBeerMugEmpty,
    Bar: faGlassMartini
};

const imageSrcMap = {
    European: EuropeanImageSrc,
    Japanese: JapaneseImageSrc,
    Mexican: MexicanImageSrc,
    Spanish: SpanishImageSrc,
    Steak: SteakImageSrc,
    Sushi: SushiImageSrc,
    Thai: ThaiImageSrc
}

const CuisineOption = ({name}) => {

    const icon = iconsMap[name];
    const imgSrc = imageSrcMap[name];

    return (
        <div id={`${name}-option`} className="cuisine-option">
            {icon && <FontAwesomeIcon className="icon cuisine-icon" icon={icon}/>}
            {imgSrc && <img alt={name} className="cuisine-icon" src={imgSrc}/>}
            <span className="cuisine-option-name">{name}</span>
        </div>
    );
};

export default CuisineOption;