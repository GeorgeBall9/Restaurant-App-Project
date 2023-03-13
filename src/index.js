import React from 'react';
import ReactDOM from 'react-dom/client';

import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

import './style/index.css';
import Home from "./routes/Home/Home";
import MapView from "./routes/MapView/MapView";

import store from './app/store'
import { Provider } from 'react-redux'

import reportWebVitals from './reportWebVitals';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home/>,
    },
    {
        path: "/map",
        element: <MapView/>,
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