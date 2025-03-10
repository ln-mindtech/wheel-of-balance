import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import mixpanel from 'mixpanel-browser';
import AppReactGa from './service/AppReactGa';
import AppReactPixel from "./service/AppReactPixel";

AppReactGa.init();
AppReactPixel.init();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

mixpanel.init(process.env.REACT_APP_MIXPANEL_TOKEN, { debug: true, track_pageview: true, persistence: 'localStorage' });
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
