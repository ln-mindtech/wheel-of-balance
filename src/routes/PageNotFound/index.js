import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import brokenWheel from "../../images/brokenWheel.png";
import './pageNotFound.css';
import {Button} from "../../components/Button";
import APIService from "../../service/APIService";
import { useParams } from 'react-router-dom';

const PageNotFound = () => {
    return (
        <div className={'page-not-found-div'}>
            <div className={'page-not-found-header-div'}>
                <span>404</span>
                <img className={'page-not-found-img'} src={brokenWheel} alt="Home" />
            </div>
            <p>It seems like something went wrong.</p>
            <p>Please try again by pressing button below.</p>
            <Link to="/">
                <Button text={'Let\'s go!'}/>
            </Link>
        </div>
    );
}

export default PageNotFound