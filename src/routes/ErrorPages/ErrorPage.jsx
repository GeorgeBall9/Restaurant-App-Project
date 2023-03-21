import React from 'react';
import './ErrorPage.css';
import { Link, useRouteError } from 'react-router-dom';
import errorImage from './errorImage.png';


const ErrorPage = () => {
    const error = useRouteError();
    console.error(error);

    return (
        <div className="error-page">
            
            <div className="error-page-content">
                <img src={errorImage} alt="Error" className="error-image"></ img>
                <h1>Oops!</h1>
                <p>Sorry, an unexpected error has occurred.</p>
                <p>
                    <i>{error.statusText || error.message}</i>
                </p>
                <Link to="/">Home</Link>
            </div>
            
        </div>
    );
};

export default ErrorPage;