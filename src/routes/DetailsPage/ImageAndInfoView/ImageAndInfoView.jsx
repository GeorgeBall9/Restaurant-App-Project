import "./ImageAndInfoView.css";
import CheckInButton from "../CheckInButton/CheckInButton";
import StarRating from "../../../common/components/StarRating/StarRating";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLocationDot, faPhone} from "@fortawesome/free-solid-svg-icons";
import {forwardRef} from "react";

const ImageAndInfoView = forwardRef((props, ref) => {

    const {id, name, photoUrl, starRating, price, priceLevel, formattedAddress, phone, isOpen} = props;

    return (
        <div className="image-and-info-container">
            <div className="backdrop" style={{backgroundImage: `url(${photoUrl})`}}></div>

            <div className="restaurant-info">
                <div className="title-container">
                    <h1 ref={ref}>{name}</h1>

                    <CheckInButton restaurantId={id}/>
                </div>

                <StarRating rating={starRating}/>

                <div className="price">
                    <p>{priceLevel !== null ? priceLevel : price}</p>
                </div>

                <div className="address info">
                    <FontAwesomeIcon icon={faLocationDot} className="icon"/>
                    <p>{formattedAddress}</p>
                </div>

                {phone && (
                    <div className="phone info">
                        <FontAwesomeIcon icon={faPhone} className="icon"/>
                        <p>{phone}</p>
                    </div>
                )}

                <div className="open-status">{isOpen ? 'Open Now' : 'Closed'}</div>

            </div>
        </div>
    );
});

export default ImageAndInfoView;