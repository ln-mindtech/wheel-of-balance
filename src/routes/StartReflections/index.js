import React, { useState, useEffect } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import startReflectionsImage from "../../images/winhuman.svg";
import './strartReflections.css';
import {Button} from "../../components/Button";
import APIService from "../../service/APIService";
import { useParams } from 'react-router-dom';
import mixpanel from 'mixpanel-browser';

const StartReflections = ({data, setData}) => {
    let history = useNavigate();
    
    const { hash } = useParams();
    sessionStorage.setItem('hash_participant', hash);
    sessionStorage.setItem('exported', '');

    if (!sessionStorage.getItem('id_participant') && sessionStorage.getItem('hash_participant')) {
        APIService.getParticipantByHash(hash)
            .then(response => {
                sessionStorage.setItem('id_participant', response.data.id);
                mixpanel.identify(response.data.id);
            })
            .catch(error => {
                history("*");
                console.error('Error fetching data:', error);
            });
    }

    const sendAnalytics = () => {
        mixpanel.track('Let’s start balancing');
    };

    return (
        <div className={'balance-wheel-save-div'}>
            <img src={startReflectionsImage} alt="Home" />
            <p>
                It is time to focus on taking action steps to improve areas that are causing imbalance in your life.
                A balanced life leads to happiness and conscious life, and our aim is to assist you in achieving it.
            </p>
            <Link to="/reflection/1">
                <Button text={'Let\'s start balancing my wheel'} onclick={sendAnalytics}/>
            </Link>
        </div>
    );
}

export default StartReflections