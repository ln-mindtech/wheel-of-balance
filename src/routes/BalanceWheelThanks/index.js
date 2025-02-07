import React, { useState, useEffect } from 'react';
import discordImage from "../../images/discord.png";
import facebookImage from "../../images/facebook.png";
import whatsappImage from "../../images/whatsapp.png";
import './index.css';
import {TopButton} from "../../components/TopButton";

const BalanceWheelThanks = () => {
    let backUrl = '/';

    if (document.title.includes('New')) {
        backUrl = '/welcome/new';
    } else {
        backUrl = '/';
    }

    return (
        <div className={'balance-wheel-thanks'}>
            <TopButton backUrl={backUrl}/>
            <div className={'content'}>
                <h2>
                    Thank you for your trust!
                </h2>
                <h2>What's next?</h2>
                <p>Each Life Balance Wheel is analyzed individually, which takes between 1 to 24 hours. We want to make sure you receive personalized insights that truly help you.</p>
                <p>🚀In the meantime, join our community on your preferred platform!</p>
                <div className='icons'>
                    <ul>
                        <li><a href="https://discord.gg/CTFBuNUs"><img width="75" height="77" src={discordImage} alt="Discord"/></a></li>
                        <li><a href="https://www.facebook.com/share/g/1FM2ZEvMLf/"><img width="75" height="77" src={facebookImage} alt="facebook"></img></a></li>
                        <li><a href="https://chat.whatsapp.com/GcplC0jCKHT4QNsVsmdMwT"><img width="75" height="77" src={whatsappImage}  alt="whatsapp"></img></a></li>
                    </ul>
                    <p className='join-us'>(сlick on the icon to join us)</p>
                </div>
                <p>Here's what you'll get:</p>
            <ul>
                <li>✅ Exclusive content and resources for personal growth</li>
                <li>✅ A supportive network of like-minded individuals</li>
                <li>✅ Real success stories and guidance to help you progress</li>
            </ul>
            </div>
        </div>
    );
}

export default BalanceWheelThanks