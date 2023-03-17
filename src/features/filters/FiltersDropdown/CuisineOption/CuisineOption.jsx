import "./CuisineOption.css";
import {
    faUtensils,
    faGlassMartini,
    faBurger,
    faBeerMugEmpty,
    faPizzaSlice,
    faPepperHot,
    faBowlRice
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import GreyEuropeanImageSrc from "../../../../common/images/icons-grey/European.png";
import GreyJapaneseImageSrc from "../../../../common/images/icons-grey/Japanese.png";
import GreyMexicanImageSrc from "../../../../common/images/icons-grey/Mexican.png";
import GreySpanishImageSrc from "../../../../common/images/icons-grey/Spanish.png";
import GreySteakImageSrc from "../../../../common/images/icons-grey/Steak.png";
import GreySushiImageSrc from "../../../../common/images/icons-grey/Sushi.png";
import GreyThaiImageSrc from "../../../../common/images/icons-grey/Thai.png";

import YellowEuropeanImageSrc from "../../../../common/images/icons-yellow/European.png";
import YellowJapaneseImageSrc from "../../../../common/images/icons-yellow/Japanese.png";
import YellowMexicanImageSrc from "../../../../common/images/icons-yellow/Mexican.png";
import YellowSpanishImageSrc from "../../../../common/images/icons-yellow/Spanish.png";
import YellowSteakImageSrc from "../../../../common/images/icons-yellow/Steak.png";
import YellowSushiImageSrc from "../../../../common/images/icons-yellow/Sushi.png";
import YellowThaiImageSrc from "../../../../common/images/icons-yellow/Thai.png";
import {useState} from "react";

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

const greyImageSrcMap = {
    European: GreyEuropeanImageSrc,
    Japanese: GreyJapaneseImageSrc,
    Mexican: GreyMexicanImageSrc,
    Spanish: GreySpanishImageSrc,
    Steak: GreySteakImageSrc,
    Sushi: GreySushiImageSrc,
    Thai: GreyThaiImageSrc
};

const yellowImageSrcMap = {
    European: YellowEuropeanImageSrc,
    Japanese: YellowJapaneseImageSrc,
    Mexican: YellowMexicanImageSrc,
    Spanish: YellowSpanishImageSrc,
    Steak: YellowSteakImageSrc,
    Sushi: YellowSushiImageSrc,
    Thai: YellowThaiImageSrc
};

const CuisineOption = ({name, selected, handleClick}) => {

    const icon = iconsMap[name];
    const imgSrc = selected ? yellowImageSrcMap[name] : greyImageSrcMap[name];

    return (
        <div
            id={`${name}-option`}
            className={`cuisine-option ${selected ? "selected" : ""}`}
            onClick={() => handleClick(name)}
        >
            {icon && <FontAwesomeIcon className="icon cuisine-icon" icon={icon}/>}
            {imgSrc && <img alt={name} className="cuisine-icon" src={imgSrc}/>}
            <span className="cuisine-option-name">{name}</span>
        </div>
    );
};

export default CuisineOption;