import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import './CheckInsDetails.css';

const CheckInsDetails = ({ checkIn, onClose }) => {
    const handleRemoveCheckIn = () => {
        // Add logic to remove check-in
    };

    return (
        <div className="check-ins-details-container">
            <div className="check-ins-details">
                <div className="check-ins-details-header">
                    <button className="back-button" onClick={onClose}>
                        <FontAwesomeIcon className="icon" icon={faArrowLeft} />
                        Back
                    </button>
                    <h1>{checkIn.restaurant.name}</h1>
                    <button className="remove-check-in-button" onClick={handleRemoveCheckIn}>
                        <FontAwesomeIcon className="icon" icon={faTrashAlt} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CheckInsDetails;
