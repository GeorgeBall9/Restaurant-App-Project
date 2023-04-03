/*
Description: ErrorPage component
Author: George Ball
Contact: georgeball14@hotmail.com
*/


import React from 'react';
import './ErrorPage.css';
import { Link, useRouteError } from 'react-router-dom';
import errorImage from '../../common/images/errorImage.png';


const ErrorPage = () => {
    const error = useRouteError();
    console.error(error);

    return (
        <div className="error-page">
            
            <div className="error-page-content">
            
                <img src={errorImage} alt="Error" className="error-image"></ img>
                <h1>Oops!</h1>
                <p>Sorry, we can't find that page. Why not explore our home page?</p>
                
                <Link to="/">Home</Link>
                
            </div>

            <div className="error-description">
                <p>
                   Error Code <b>{error.status}-{error.statusText}</b>
                </p>
            </div>
            
        </div>
    );
};

export default ErrorPage;