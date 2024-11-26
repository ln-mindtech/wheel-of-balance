import welcomeImage from "../../images/welcome_mini.png";
import {Link} from "react-router-dom";
import React from "react";
import './welcome.css';
import {Button} from "../../components/Button";
import mixpanel from 'mixpanel-browser';
import APIService from "../../service/APIService";

const sendAnalytics = () => {
    mixpanel.track('Lets go press');
};

const onClick = () => {
    sendAnalytics();
    if (!sessionStorage.getItem('hash_participant') || !sessionStorage.getItem('id_participant')) {
        APIService.createParticipant()
            .then(response => {
                if (response.data.hash) {
                    sessionStorage.setItem('hash_participant', response.data.hash);
                    sessionStorage.setItem('id_participant', response.data.id);
                }
        });
    }
}

export const Welcome = () => {
    return (
        <div className={'welcome-div'}>
            <div className="welcome-content-wrapper">
                <img className={'welcome-img'} src={welcomeImage} alt="Welcome"/>
                <h1>Is your life out of Balance?</h1>
                <p>Take a quick self-assessment to gain a better understanding of yourself and identify areas that may
                    need improvement for living happy and mindful life.</p>
                <Link to="/balanceWheel">
                    <Button text={'Let\'s Go!'} onclick={onClick}/>
                </Link>
            </div>

        </div>
    );
}