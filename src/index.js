import React from 'react';
import ReactDOM from 'react-dom/client';

import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

import './style/index.css';
import HomePage from "./routes/HomePage/HomePage";
import MapPage from "./routes/MapPage/MapPage";
import ErrorPage from './routes/ErrorPages/ErrorPage';
import DetailsPage from './routes/DetailsPage/DetailsPage';

import store from './app/store'
import {Provider} from 'react-redux'

import reportWebVitals from './reportWebVitals';
import Root from "./routes/Root";
import EditProfilePage from "./routes/EditProfilePage/EditProfilePage";
import SignUpPage from './routes/SignUp/SignUpPage';
import SignInPage from "./routes/SignIn/SignInPage";
import Auth from "./routes/Auth/Auth";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: "home",
                element: <HomePage/>,
            },
            {
                path: "details/:id",
                element: <DetailsPage/>,
            },
            {
                path: "map",
                element: <MapPage/>,
            },
            {
                element: <Auth/>,
                children: [
                    {
                        path: "sign-in",
                        element: <SignInPage/>,
                    },
                    {
                        path: "sign-up",
                        element: <SignUpPage/>
                    },
                    {
                        path: "edit-profile",
                        element: <EditProfilePage/>,
                    },
                ]
            },
        ],
    },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router}/>
        </Provider>
    </React.StrictMode>
);

reportWebVitals();
