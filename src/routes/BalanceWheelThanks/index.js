import React from 'react';
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
                Thank You for Taking our Wheel of Life Balance Assessment!
                </h2>
                <h2>What's next?</h2>
                <p>We’ve received your results and contact information.</p>
                <p>Each application is processed manually, so it usually takes up to one working day to get started.<br/> Keep an eye on the messenger you chose—we’ll be in touch soon.</p>
                <p>Get ready for the journey! 🚀</p>
                <h2>Meanwhile, take the next step by joining our supportive community! 🤝</h2>
                <div className='icons'>
                <p className='join-us'>Choose your favorite platform and join us today! </p>
                    <ul>
                        <li><a href="https://discord.gg/CTFBuNUs"><img width="75" height="77" src={discordImage} alt="Discord"/></a></li>
                        <li><a href="https://www.facebook.com/share/g/1FM2ZEvMLf/"><img width="75" height="77" src={facebookImage} alt="facebook"></img></a></li>
                        <li><a href="https://chat.whatsapp.com/GcplC0jCKHT4QNsVsmdMwT"><img width="75" height="77" src={whatsappImage}  alt="whatsapp"></img></a></li>
                    </ul>
                </div>
            <ul>
                <li>✅ Discover success stories and insights from others</li>
                <li>✅ Access exclusive content and resources for personal growth</li>
                <li>✅ Get expert guidance and support to help you progress</li>
                <li>✅ Connect with like-minded people in a motivating environment</li>
            </ul>
            </div>
        </div>
    );
}

export default BalanceWheelThanks