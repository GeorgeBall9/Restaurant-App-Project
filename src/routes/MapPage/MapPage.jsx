/*
Description: MainMapChildren component to be displayed in MapPage route
Author: Ryan Henzell-Hill
Contact: ryan.henzell-hill@outlook.com
*/

// style sheet
import "./MapPage.css";

// imported components
import Navigation from "../../common/components/Navigation/Navigation";
import Slider from "./Slider/Slider";
import MapView from "../../common/components/MapView/MapView";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {selectRestaurants} from "../../features/restaurants/restaurantsSlice";

const MapPage = () => {

    const restaurants = useSelector(selectRestaurants);

    const [windowHeight, setWindowHeight] = useState(+window.innerHeight);

    useEffect(() => {
        setWindowHeight(+window.innerHeight)
    }, [window.innerHeight]);

    return (
        <div className="map-page-container">
            <Navigation view="map"/>

            <MapView zoom={14} height={windowHeight} restaurants={restaurants}/>

            <Slider/>
        </div>
    );
};

export default MapPage;