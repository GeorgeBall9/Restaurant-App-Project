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

import GreyEuropeanImageSrc from "../../../../images/icons-grey/European.png";
import GreyJapaneseImageSrc from "../../../../images/icons-grey/Japanese.png";
import GreyMexicanImageSrc from "../../../../images/icons-grey/Mexican.png";
import GreySpanishImageSrc from "../../../../images/icons-grey/Spanish.png";
import GreySteakImageSrc from "../../../../images/icons-grey/Steak.png";
import GreySushiImageSrc from "../../../../images/icons-grey/Sushi.png";
import GreyThaiImageSrc from "../../../../images/icons-grey/Thai.png";

import YellowEuropeanImageSrc from "../../../../images/icons-yellow/European.png";
import YellowJapaneseImageSrc from "../../../../images/icons-yellow/Japanese.png";
import YellowMexicanImageSrc from "../../../../images/icons-yellow/Mexican.png";
import YellowSpanishImageSrc from "../../../../images/icons-yellow/Spanish.png";
import YellowSteakImageSrc from "../../../../images/icons-yellow/Steak.png";
import YellowSushiImageSrc from "../../../../images/icons-yellow/Sushi.png";
import YellowThaiImageSrc from "../../../../images/icons-yellow/Thai.png";
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

    const isSelected = name === selected;
    const icon = iconsMap[name];
    const imgSrc = isSelected ? yellowImageSrcMap[name] : greyImageSrcMap[name];

    return (
        <div
            id={`${name}-option`}
            className={`cuisine-option ${isSelected ? "selected" : ""}`}
            onClick={() => handleClick(name)}
        >
            {icon && <FontAwesomeIcon className="icon cuisine-icon" icon={icon}/>}
            {imgSrc && <img alt={name} className="cuisine-icon" src={imgSrc}/>}
            <span className="cuisine-option-name">{name}</span>
        </div>
    );
};

export default CuisineOption;