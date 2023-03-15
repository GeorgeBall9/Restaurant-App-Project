/*
Description: Map component to be displayed in MapPage route
Author: Ryan Henzell-Hill
Contact: ryan.henzell-hill@outlook.com
*/

// style sheet
import "./MapPage.css";

// imported components
import Map from "../../features/map/Map/Map";
import RestaurantCard from "../../common/components/RestaurantCard/RestaurantCard";

// redux imports
import {useSelector} from "react-redux";
import {selectDisplayedRestaurant} from "../../features/map/mapSlice";

import SearchBar from "../../common/components/SearchBar/SearchBar";
import {faChevronLeft} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useNavigate} from "react-router-dom";

const MapPage = () => {

    const displayedRestaurant = useSelector(selectDisplayedRestaurant);
    const navigate = useNavigate();

    const handleBackButtonClick = () => navigate("/");

    return (
        <div className="mapview-container">
            <div className="search-bar-container">
                <button className="back-button" onClick={handleBackButtonClick}>
                    <FontAwesomeIcon className="icon" icon={faChevronLeft}/>
                </button>

                <SearchBar/>
            </div>

            <Map/>

            <div className="restaurant-card-container">
                {displayedRestaurant && (
                    <RestaurantCard {...displayedRestaurant} openingHours={displayedRestaurant.hours[6]} view="map"/>
                )}
            </div>
        </div>
    );
};

export default MapPage;