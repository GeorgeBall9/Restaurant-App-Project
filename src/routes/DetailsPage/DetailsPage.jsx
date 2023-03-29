import './DetailsPage.css';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAllRestaurants } from '../../features/restaurants/restaurantsSlice';
import StarRating from '../../common/components/RestaurantCard/StarRating/StarRating';
import { useState, useEffect } from 'react';

import { faChevronLeft, faLocationDot } from '@fortawesome/free-solid-svg-icons';
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
    
    const {name, photoUrl, rating, hours, website, description, phone} = restaurant;
    const { street1, city, postalcode } = restaurant.address;
    const starRating = Math.round(rating * 2) / 2;

    const toggleShowAllHours = () => {
        setShowAllHours(!showAllHours);
    };

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
            <button className="back-button" onClick={() => navigate(-1)}>
                <FontAwesomeIcon icon={faChevronLeft} className="icon"></FontAwesomeIcon>Back</button>
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
                    {showAllHours &&(
                        <button className="hide-button" onClick={toggleShowAllHours}>Hide</button>
                    )}
                    <p>{phone}</p>
                </div>

                <div className="address">
                    <h2>Address</h2>
                    <p>{street1}, {city}, {postalcode}</p>
                </div>

                <div className="reservation">
                    <h2>Reservation</h2>
                    <a href={website}>{website}</a>

                </div>

                <div className="pictures">
                    <h2>Pictures</h2>            
                </div>

                <div className="description">
                    <h2>Description</h2>
                    <p>{description}</p>
                </div>
            </div>
        </div>
    );
  };
  
  export default DetailsPage;