/*
Description: Map component to be displayed in MapPage route
Author: Ryan Henzell-Hill
Contact: ryan.henzell-hill@outlook.com
*/

// style sheet
import "./MapPage.css";

// imported components
import Map from "../../features/map/Map/Map";
import Navigation from "../../common/components/Navigation/Navigation";
import Slider from "../../features/slider/Slider/Slider";

const MapPage = () => {

    return (
        <div className="map-page-container">
            <Navigation view="map"/>

            <Map/>

            <Slider/>
        </div>
    );
};

export default MapPage;