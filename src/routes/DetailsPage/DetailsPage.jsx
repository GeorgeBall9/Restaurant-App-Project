import './DetailsPage.css';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAllRestaurants } from '../../features/restaurants/restaurantsSlice';
import StarRating from '../../common/components/RestaurantCard/StarRating/StarRating';
import { useState, useEffect } from 'react';

import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const DetailsPage = () => {
    const { id } = useParams();
    const allRestaurants = useSelector(selectAllRestaurants);
    const [restaurant, setRestaurant] = useState(null);
    const [showAllHours, setShowAllHours] = useState(false);
    
    const navigate = useNavigate();

    useEffect(() => {
        if (allRestaurants) {
          const foundRestaurant = allRestaurants.find(restaurant => restaurant.id === id);
          setRestaurant(foundRestaurant);
        }
      }, [allRestaurants, id]);

    if (!restaurant) {
      return <div>Restaurant not found.</div>;
    }
    
    const {name, photoUrl, rating, hours} = restaurant;
    const starRating = Math.round(rating * 2) / 2;

    const toggleShowAllHours = () => {
        setShowAllHours(!showAllHours);
    };

    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const today = new Date().getDay();
    const displayedHours = showAllHours ? hours.map((hour, index) => `${daysOfWeek[index]}: ${hour}`) : [hours[today]];
    const isOpen = displayedHours[0] !== "Closed";
  
    // Display the restaurant information here
    // ...

    return (
        <div className="container">
            <div className="details-page">
                <button className="back-button" onClick={() => navigate(-1)}>
                    <FontAwesomeIcon icon={faChevronLeft} className="back-button-icon"></FontAwesomeIcon>Back</button>
                <div className="details-page-restaurant-details-container">
                    
                    <div className="details-page-image-container">
                        <img src={photoUrl} alt={name}/>
                    </div>

                    <div className="details-page-main-info">
                        <h2>{name}</h2>
                        <StarRating rating={starRating}/>
                        <div className="details-page-opening-times">
                        {isOpen && <div className="open-status">Open</div>}
                            {displayedHours.map((hour, index) => (
                                <p key={index}>{hour}</p>
                            ))}
                        </div>
                        {!showAllHours && (
                            <button className="show-more-button" onClick={toggleShowAllHours}>
                                Show more
                            </button>
                        )}
                    </div>

                    <div className="address">
                        <h2>Address</h2>
                    </div>

                    <div className="reservation">
                        <h2>Reservation</h2>

                    </div>

                    <div className="pictures">
                        <h2>Pictures</h2>            
                    </div>
                </div>
            </div>
        </div>
    );
  };
  
  export default DetailsPage;