import welcomeImage from "../../../images/human-min.png";
import uderlineImage from "../../../images/underline.svg";
import {Link} from "react-router-dom";
import React, { useEffect } from 'react';
import './welcome.css';
import {Button} from "../../../components/legacy/Button";
import mixpanel from 'mixpanel-browser';
import APIService from "../../../service/APIService";

const sendAnalytics = () => {
    mixpanel.track('Lets go press');
};

const onClick = () => {
    sendAnalytics();
    APIService.createParticipant()
        .then(response => {
            if (response.data.hash) {
                sessionStorage.setItem('hash_participant', response.data.hash);
                sessionStorage.setItem('id_participant', response.data.id);
            }
    });
}

export const LegacyWelcome = () => {
    useEffect(() => {
        document.title = 'Mindtech - Welcome';
    }, []);
    return (
        <div className={'legacy-welcome-div'}>
            <div className="welcome-content-wrapper">
                <img src={welcomeImage} className={'legacy-welcome-img'} alt="Home" />
                <h1>Is your life out of balance?</h1>
                <img src={uderlineImage} className={'legacy-underline-img'} alt="underline" />
                <p>Take a quick self-assessment to gain a better understanding of yourself and identify areas that may need improvement for living happy and mindful life.</p>
                <Link to="/balance/wheel">
                    <Button text={'Let\'s go!'} onclick={onClick}/>
                </Link>
            </div>
        </div>
    );
}