import React, { useState, useEffect } from 'react';

import './index.css';
import {TopButton} from "../../components/TopButton";

const BalanceWheelThanks = () => {
    let backUrl = '/';

    if (document.title.includes('New')) {
        backUrl = '/welcome/new';
    } else {
        backUrl = '/welcome';
    }

    return (
        <div className={'balance-wheel-thanks'}>
            <TopButton backUrl={backUrl}/>
            <div className={'content'}>
                <h2>
                    Thank you for taking the Wheel of Balance assessment with us!
                </h2>
                <p>Now you can check your email for your own saved copy of your Wheel.</p>
                <p>We wish you continued success and fulfillment on your journey to balance and well-being!</p>
            </div>
        </div>
    );
}

export default BalanceWheelThanks