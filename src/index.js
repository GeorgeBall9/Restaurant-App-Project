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
import AuthPage from './routes/Auth/AuthPage';

import store from './app/store'
import {Provider} from 'react-redux'

import reportWebVitals from './reportWebVitals';
import Root from "./routes/Root";
<<<<<<< HEAD
import ProfilePage from "./routes/ProfilePage/ProfilePage";
=======
import SignUpPage from './routes/Auth/SignUp/SignUpPage';
>>>>>>> upstream/main

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <HomePage/>,
            },
            {
                path: "/details/:id",
                element: <DetailsPage/>,
            },
            {
                path: "/map",
                element: <MapPage/>,
            },
            {
                path: "/login",
                element: <AuthPage/>,
            },
            {
<<<<<<< HEAD
                path: "/profile",
                element: <ProfilePage/>,
            },
=======
                path: "/signup",
                element: <SignUpPage/>
            }
>>>>>>> upstream/main
        ],
    },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Provider store={store}>
          <RouterProvider router={router} />
      </Provider>
  </React.StrictMode>
);

reportWebVitals();
