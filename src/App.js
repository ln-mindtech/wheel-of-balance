import React, { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import './App.css';

import {Welcome} from "./routes/Welcome";
import {LegacyWelcome} from "./routes/legacy/Welcome";
import {BalanceWheel} from "./routes/BalanceWheel";
import {LegacyBalanceWheel} from "./routes/legacy/BalanceWheel";
import {SaveBalanceWheel} from "./routes/SaveBalanceWheel";
import {LegacySaveBalanceWheel} from "./routes/legacy/SaveBalanceWheel";
import {ViewBalanceWheel} from "./routes/ViewBalanceWheel";

import {Footer} from "./components/Footer";
import {WelcomeSecond} from "./routes/WelcomeSecond";
import {BalanceWheelSecond} from "./routes/BalanceWheelSecond";
import {SaveBalanceWheelSecond} from "./routes/SaveBalanceWheelSecond";

const About = React.lazy(() => import('./routes/About'));
const PrivacyPolicy = React.lazy(() => import('./routes/PrivacyPolicy'));
const TermConditions = React.lazy(() => import('./routes/TermConditions'));
const PageNotFound = React.lazy(() => import('./routes/PageNotFound'));
const BalanceWheelThanks = React.lazy(() => import('./routes/BalanceWheelThanks'));
const StartReflections = React.lazy(() => import('./routes/StartReflections'));
const Reflections = React.lazy(() => import('./routes/Reflections'));
const Reflection = React.lazy(() => import('./routes/Reflection'));
const FeedbackBalanceWheel = React.lazy(() => import('./routes/FeedbackBalanceWheel'));

function App() {
    const [data, setData] = useState(null);

    useEffect(() => {
        let url = window.location.href,
            title = document.title;

        if (url.includes('/thanks') && title.includes('Welcome')) {
            return;
        }

        if (url.includes('/new')) {
            document.title = 'Mindtech - Welcome New';
        } else {
            document.title = 'Mindtech - Welcome';
        }

    }, []);
    return (
        <Router>
            <div className="App">
                <Routes>
                    {/*<Route path="/" element={<Welcome />} />*/}
                    {/*<Route path="/welcome" element={<Welcome />} />*/}
                    {/*<Route path="/welcome/new" element={<WelcomeSecond />} />*/}
                    {/*<Route path="/welcome/wheel" element={<LegacyWelcome />} />*/}
                    <Route path="/" element={<BalanceWheel setData={setData}/>} />
                    <Route path="/welcome" element={<BalanceWheel setData={setData}/>} />
                    <Route path="/welcome/new" element={<BalanceWheelSecond setData={setData}/>} />
                    <Route path="/welcome/wheel" element={<LegacyBalanceWheel setData={setData}/>} />

                    <Route path="/balanceWheel" element={<BalanceWheel setData={setData}/>} />
                    <Route path="/balance/wheel/new" element={<BalanceWheelSecond setData={setData}/>} />
                    <Route path="/balance/wheel" element={<LegacyBalanceWheel setData={setData}/>} />
                    <Route path="/saveBalanceWheel" element={<SaveBalanceWheel data={data} setData={setData}/>} />
                    <Route path="/save/balance/wheel/new" element={<SaveBalanceWheelSecond data={data} setData={setData}/>} />
                    <Route path="/save/balance/wheel" element={<LegacySaveBalanceWheel data={data} setData={setData}/>} />
                    <Route path="/viewBalanceWheel/:hash" element={<ViewBalanceWheel data={data} setData={setData}/>} />
                    <Route path="/feedbackBalanceWheel/:hash" element={<Suspense fallback='Loading...'><FeedbackBalanceWheel data={data} setData={setData}/></Suspense>} />

                    <Route path="/startReflections/:hash" element={<Suspense fallback='Loading...'><StartReflections data={data} setData={setData}/></Suspense>} />
                    <Route path="/reflections/:hash" element={<Suspense fallback='Loading...'><Reflections data={data} setData={setData}/></Suspense>} />
                    <Route path="/reflections/:hash/:id" element={<Suspense fallback='Loading...'><Reflections data={data} setData={setData}/></Suspense>} />
                    <Route path="/reflections" element={<Suspense fallback='Loading...'><Reflections data={data} setData={setData}/></Suspense>} />
                    <Route path="/reflection/:id" element={<Suspense fallback='Loading...'><Reflection /></Suspense>} />
                    <Route path="/about" element={<Suspense fallback='Loading...'><About /></Suspense>} />
                    <Route path="/privacy-policy" element={<Suspense fallback='Loading...'><PrivacyPolicy /></Suspense>} />
                    <Route path="/term-conditions" element={<Suspense fallback='Loading...'><TermConditions /></Suspense>} />
                    <Route path="/balance/wheel/thanks" element={<Suspense fallback='Loading...'><BalanceWheelThanks /></Suspense>} />

                    <Route path="*" element={<Suspense fallback='Loading...'><PageNotFound /></Suspense>} />
                </Routes>
                <Footer></Footer>
            </div>
        </Router>
    );
}

export default App;