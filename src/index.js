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
import ProfilePage from "./routes/ProfilePage/ProfilePage";
import Bookmarks from "./routes/Bookmarks/Bookmarks";
import CheckIns from "./routes/CheckIns/CheckIns";
import PreviewReviews from "./routes/PreviewReviews/PreviewReviews";
import ReviewsPage from "./routes/ReviewsPage/ReviewsPage";
import FriendsPage from "./routes/FriendsPage/FriendsPage";
import FriendsProfile from "./routes/FriendsPage/FriendsProfile/FriendsProfile";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: "/",
                element: <HomePage/>,
            },
            {
                path: "details/:id",
                element: <DetailsPage/>,
            },
            {
                path: "reviews/:id",
                element: <ReviewsPage/>,
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
                        path: "profile",
                        element: <ProfilePage/>,
                    },
                    {
                        path: "edit-profile",
                        element: <EditProfilePage/>,
                    },
                    {
                        path: "bookmarks",
                        element: <Bookmarks/>
                    },
                    {
                        path: "check-ins",
                        element: <CheckIns/>,
                    },
                    {
                        path: "preview-reviews",
                        element: <PreviewReviews/>,
                    },
                    {
                        path: "friends",
                        element: <FriendsPage/>,
                    },
                    {
                        path: "view-profile/:userId",
                        element: <FriendsProfile/>,
                    },
                    {
                        path: "view-check-ins/:userId",
                        element: <CheckIns/>,
                    },
                    {
                        path: "view-reviews/:userId",
                        element: <ReviewsPage/>,
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
