import React from 'react';
import {Link} from 'react-router-dom';
import './index.css';
import backToWheelIcon from "../../images/backToWheeelIcon.png";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export const TopButton = ({backUrl = '/'}) => {
    return (
        <div className={'top-button'}>
            <div className={'float-left'}>
                <Link to={backUrl}>
                    <label className={'back-to-balance-wheel'}>
                        <ArrowBackIcon/>
                    </label>
                </Link>
            </div>
            <div className={'middle-div'}></div>
            <div className={'float-right'}>
                <img className={'balance-wheel-icon'} src={backToWheelIcon} alt="balance-wheel-icon" />
            </div>
        </div>
    );
}