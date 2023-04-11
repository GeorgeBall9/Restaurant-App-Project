import "./Reviews.css";
import StarRating from "../../../common/components/RestaurantCard/StarRating/StarRating";
import React from "react";
import {faCircleUp as faSolidCircleUp} from "@fortawesome/free-solid-svg-icons";
import {faCircleUp} from "@fortawesome/free-regular-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const reviews = [
    {
        id: 1,
        restaurantId: null, // will be the id of the actual restaurant in reality
        userId: null, // id of the user who wrote the review
        rating: 3, // stars out of 5
        title: "Okay but could be better!",
        content: "The food was good but it took ages and the restaurant wasn't even that busy.",
        date: +new Date(),
        reactions: {
            upVotes: 1,
            downVotes: 2
        }
    },
    {
        id: 2,
        restaurantId: null, // will be the id of the actual restaurant in reality
        userId: null, // id of the user who wrote the review
        rating: 4.5, // stars out of 5
        title: "Great food",
        content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore 
        et dolore magna aliqua. Ac feugiat sed lectus vestibulum. Mauris nunc congue nisi vitae suscipit tellus mauris 
        a diam.`,
        date: +new Date(),
        reactions: {
            upVotes: 2,
            downVotes: 0
        }
    },
    {
        id: 3,
        restaurantId: null, // will be the id of the actual restaurant in reality
        userId: null, // id of the user who wrote the review
        rating: 4.5, // stars out of 5
        title: "A lovely meal out with the family",
        content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore 
        et dolore magna aliqua. Ac feugiat sed lectus vestibulum. Mauris nunc congue nisi vitae suscipit tellus mauris 
        a diam. Elementum facilisis leo vel fringilla est ullamcorper eget nulla. Arcu risus quis varius quam quisque. 
        Pharetra diam sit amet nisl suscipit. Tempus quam pellentesque nec nam aliquam. Sit amet volutpat consequat 
        mauris nunc congue. Elit ullamcorper dignissim cras tincidunt lobortis.`,
        date: +new Date(),
        reactions: {
            upVotes: 5,
            downVotes: 0
        }
    },
];

const Reviews = ({reviews}) => {

    return (
        <div className="reviews-container">
            {reviews.map(({id, title, rating, content, date, reactions}) => (
                <div key={id} className="review">
                    <h3>{title}</h3>

                    <div className="rating-and-date-container">
                        <StarRating rating={rating}/>

                        <p>
                            <strong>Visit date: </strong>
                            {new Date(date).toLocaleDateString()}
                        </p>
                    </div>

                    <p>{content}</p>

                    <div className="buttons-container">
                        <button>
                            <FontAwesomeIcon icon={faCircleUp} className="icon"/>
                        </button>

                        <p>{reactions.upVotes - reactions.downVotes}</p>

                        <button>
                            <FontAwesomeIcon icon={faCircleUp} className="icon"/>
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export {reviews};
export default Reviews;