import './DetailsPage.css';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAllRestaurants } from '../../features/restaurants/restaurantsSlice';
import StarRating from '../../common/components/RestaurantCard/StarRating/StarRating';
import { useState, useEffect } from 'react';

const DetailsPage = () => {
    const { id } = useParams();
    const allRestaurants = useSelector(selectAllRestaurants);
    
    const [restaurant, setRestaurant] = useState(null);
    
     

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
  
    // Display the restaurant information here
    // ...

    return (
        <div className="container">
            <div className="details-page">
                <div className="details-page-restaurant-details-container">
                    
                    <div className="details-page-image-container">
                        <img src={photoUrl} alt={name}/>
                    </div>

                    <div className="details-page-main-info">
                    
                        <h1>{name}</h1>
                        <StarRating rating={starRating}/>
                            <div className="details-page-opening-times">
                                {hours.map((hour, index) => (
                                    <p key={index}>{hour}</p>
                                ))}
                            </div>
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