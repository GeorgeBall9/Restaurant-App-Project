import './DetailsPage.css';
import React from 'react';
import { useNavigate, useParams} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAllRestaurants } from '../../features/restaurants/restaurantsSlice';
import StarRating from '../../common/components/RestaurantCard/StarRating/StarRating';
import { useState, useEffect } from 'react';

import { faChevronLeft, faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const DetailsPage = () => {
    const { id } = useParams();
    const allRestaurants = useSelector(selectAllRestaurants);
    const [restaurant, setRestaurant] = useState(null);
    const [showAllHours, setShowAllHours] = useState(true);
    
    const navigate = useNavigate();

    useEffect(() => {
        if (allRestaurants) {
          const foundRestaurant = allRestaurants.find(restaurant => restaurant.id === id);
          setRestaurant(foundRestaurant);
        }
      }, [allRestaurants, id]);

    useEffect(() => {
      if (restaurant === undefined) {
        navigate('/error', {replace: true});
      }
    }, [restaurant, navigate]);

    if (!restaurant) {
      return null;
    }


    const {name, photoUrl, rating, hours, website, description, phone} = restaurant;
    const { street1, city, postalcode } = restaurant.address;
    const starRating = Math.round(rating * 2) / 2;

    const groupDaysWithSameHours = (hours) => {
        const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        let groupedHours = [];
        let currentGroup = [daysOfWeek[0]];
        let currentHours = hours[0];
      
        for (let i = 1; i < hours.length; i++) {
          if (hours[i] === currentHours) {
            currentGroup.push(daysOfWeek[i]);
          } else {
            groupedHours.push({
              days: currentGroup,
              hours: currentHours,
            });
            currentGroup = [daysOfWeek[i]];
            currentHours = hours[i];
          }
        }
      
        groupedHours.push({
          days: currentGroup,
          hours: currentHours,
        });
      
        return groupedHours.map(
          (group) =>
            `${group.days[0]}${group.days.length > 1 ? `-${group.days[group.days.length - 1]}` : ""}: ${group.hours}`
        );
    };

    const today = new Date().getDay();
    const displayedHours = showAllHours ? groupDaysWithSameHours(hours) : [hours[today]];
    const isOpen = hours[today] !== "Closed";

  return (
        <div className="container">
          <div className="details-page-restaurant-image-container">
            <div className="backdrop" style={{ backgroundImage: `url(${photoUrl})` }}></div>
            <div className="details-page-restaurant-info">
              <div className="restaurant-name">
                <h1>{name}</h1>
                <StarRating rating={starRating} />
              </div>
              <div className="restaurant-address">
                <p>{street1}, {city}</p>
              </div>
              <div className="open-status">{isOpen ? 'Open Now' : 'Closed'}</div>
            </div>
          </div>
          <div className="details-page-restaurant-details-container">
            <button className="back-button" onClick={() => navigate(-1)}>
              <FontAwesomeIcon icon={faChevronLeft} className="icon" />
              Back
            </button>
            <div className="details-page-main-info">
              <div className="website">
                <h2>Website</h2>
                <p>{website}</p>
              </div>
              <div className="description">
                <h2>About</h2>
                <p>{description}</p>
              </div>
              <div className="pictures">
                <h2>Photos</h2>
                <p>No photos available.</p>
              </div>
              <div className="hours">
                <h2>Opening Times</h2>
                {displayedHours.map((hour, index) => (
                  <p key={index}>{hour}</p>
                ))}
              </div>
            </div>
      </div>
    </div>
  );
};
  
  export default DetailsPage;