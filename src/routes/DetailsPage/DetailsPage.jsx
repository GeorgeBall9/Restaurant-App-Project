import './DetailsPage.css';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAllRestaurants } from '../../features/restaurants/restaurantsSlice';
import StarRating from '../../common/components/RestaurantCard/StarRating/StarRating';
import { useState, useEffect, useRef } from 'react';

import { faChevronLeft, faLocationDot, faPhone, faUtensils, faMoneyBillWave, faLeaf } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const DetailsPage = () => {
  const { id } = useParams();
  const allRestaurants = useSelector(selectAllRestaurants);
  const [restaurant, setRestaurant] = useState(null);
  const [showAllHours, setShowAllHours] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [toggleLabel, setToggleLabel] = useState('Read More');

  const navigate = useNavigate();

  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollRef = useRef();

  useEffect(() => {
    if (allRestaurants) {
      const foundRestaurant = allRestaurants.find(restaurant => restaurant.id === id);
      setRestaurant(foundRestaurant);
    }
  }, [allRestaurants, id]);

  useEffect(() => {
    if (restaurant === undefined) {
      navigate('/error', { replace: true });
    }
  }, [restaurant, navigate]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (!restaurant) {
    return null;
  }


  const { name, photoUrl, rating, hours, website, description, phone, price, priceLevel, primaryCuisine, dietaryRestrictions } = restaurant;
  const { street1, city, postalcode } = restaurant.address;
  const starRating = Math.round(rating * 2) / 2;

  const groupDaysWithSameHours = (hours) => {
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
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

  const getDomainName = (url) => {
    try {
      const {hostname} = new URL(url);
      return hostname;
    } catch (error) {
      console.error('Error parsing URLL', error);
      return url;
    }
  }

  const today = new Date().getDay();
  const displayedHours = showAllHours ? groupDaysWithSameHours(hours) : [hours[today]];
  const isOpen = hours[today] !== "Closed";

  const handleToggleDescription = () => {
    setIsExpanded(!isExpanded);
    setToggleLabel(isExpanded ? 'Read More' : 'Read Less');
  };

  return (
    <div className="details-page-wrapper">
      <div className="details-page-banner" style={
        scrollPosition > 20
          ? { position: 'fixed', backgroundColor: 'rgba(255, 255, 255, 0.9)' }
          : { position: 'absolute', backgroundColor: 'transparent' }
      }>
        <button className="back-button" onClick={() => navigate(-1)}>
          <FontAwesomeIcon icon={faChevronLeft} className="icon" />Back
        </button>
      </div>
      <div className="details-page-restaurant-image-container">
        <div className="backdrop" style={{ backgroundImage: `url(${photoUrl})` }}></div>

        <div className="details-page-restaurant-info">
          <div className="restaurant-name">
            <h1>{name}</h1>
            <StarRating rating={starRating} />
          </div>
          {priceLevel !== null ? (
            <div className="restaurant-price">
              <p>{priceLevel}</p>
            </div>
          ) : price !== null ? (
            <div className="restaurant-price">
              <p>{price}</p>
            </div>
          ) : null}
          <div className="restaurant-address">
            <p><FontAwesomeIcon icon={faLocationDot} /> {street1}, {city}, {postalcode}</p>
          </div>
          {phone && (
            <div className="restaurant-phone">
              <p><FontAwesomeIcon icon={faPhone} />{phone}</p>
            </div>
          )}
          <div className="open-status">{isOpen ? 'Open Now' : 'Closed'}</div>
        </div>
      </div>
      <div className="details-page-restaurant-details-container">
        <div className="details-page-main-info">
          {website &&  (
            <div className="website">
            <h2>Website</h2>
            <a href={website}>{getDomainName(website)}</a>
          </div>
          )}
          {description && (
            <div className="description">
              <h2>About</h2>
              <p>
                {isExpanded ? description : description.slice(0, 200) + (description.length > 100 ? '...' : '')}
              </p>
              {description.length > 200 && (
                <button className="read-more-button" onClick={handleToggleDescription}>{toggleLabel}</button>
              )}
            </div>
          )}
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
          <div className="more-details">
            <h2>More Details</h2>
            <div className="details-map-location">
            <FontAwesomeIcon icon={faLocationDot} />
            <span>Location</span>
            <p> {street1}, {city}, {postalcode}</p>
          </div>
          <div>
            <FontAwesomeIcon icon={faMoneyBillWave} />
            <span>Price</span>
            <p> {price || priceLevel || 'N/A'}</p>
          </div>
          <div>
            <FontAwesomeIcon icon={faUtensils} />
            <span> Cuisine</span>
            <p> {primaryCuisine || 'N/A'}</p>
          </div>
          {dietaryRestrictions && (
            <div>
              <FontAwesomeIcon icon={faLeaf} />
              <span>Dietary Restrictions</span>
              <p> {dietaryRestrictions.join(', ')}</p>
            </div>
          )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;