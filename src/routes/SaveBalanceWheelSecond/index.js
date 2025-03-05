import React, { useState, useEffect } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import './index.css';
// import {Button} from "../../components/Button";
import {Checkbox} from "../../components/Checkbox";
import {Input} from "../../components/Input";
import {renderWheel} from "../BalanceWheel/utils";
import APIService from "../../service/APIService";
import mixpanel from 'mixpanel-browser';
import defaultIcon from "../../images/life-sphere/default.png";
import {SaveButton} from "../../components/SaveButton";
import AppReactPixel from "../../service/AppReactPixel";

export const SaveBalanceWheelSecond = ({data, setData}) => {
    const [canvasImg, setCanvasImg] = useState();
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [emailActive, setEmailActive] = useState(false);
    const [whatsappActive, setWhatsappActive] = useState(false);
    const [discordActive, setDiscordActive] = useState(false);
    const [facebookActive, setFacebookActive] = useState(false);
    const [isEmailDisabled, setEmailDisabled] = useState(false);
    const reevaluate = sessionStorage.getItem('reevaluate');
    let history = useNavigate();
    let email = sessionStorage.getItem('email');
    let isRenderWheel = true;
    const maxMarkValue = 10;
    const version = sessionStorage.getItem('version') ?? 1;
    const isValid = (value) => {
        return (typeof value !== 'undefined' && value);
      }

    if (!data) {
        data = [];
        isRenderWheel = false;
        APIService.getWheelDataByHash(sessionStorage.getItem('hash_participant'), version)
            .then(response => {
                setData(response.data);
                renderBalanceWheel(response.data, maxMarkValue);
            })
            .catch(error => {
                history("*");
                console.error('Error fetching data:', error);
            });
    }

    if (email) {
        data.email = email;
        setData(data);
    }

    useEffect(() => {
        if (isRenderWheel) {
            renderBalanceWheel(data, maxMarkValue);
        }
    }, []);

    useEffect(() => {
        if (reevaluate) {
            setEmailDisabled(true);
            setIsButtonDisabled(false);
        }
    })

    useEffect(() => {
        if (isValid(data.name) && ((emailActive && isEmailValid) || (whatsappActive && isValid(data.whatsapp)) || (discordActive && isValid(data.discord)) || (facebookActive && isValid(data.facebook_link)))) {
            setIsButtonDisabled(false);
        } else {
            setIsButtonDisabled(true);
        }
    }, [isEmailValid, data, emailActive, whatsappActive, discordActive, facebookActive]);

    const renderBalanceWheel = (data, maxMarkValue) => {
        const wheel = renderWheel(data, maxMarkValue);
        setCanvasImg(wheel);
    }

    const handleEmailChange = (event) => {
        const newData = {...data};
        newData.email = event.target.value;
        sessionStorage.setItem('email', event.target.value);
        setData(newData);

        // Check if the entered email is valid
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setIsEmailValid(emailPattern.test(event.target.value));
        // emailActive && setIsButtonDisabled(!emailPattern.test(event.target.value));
    };

    const handleNameChange = (event) => {
        const newData = {...data};
        newData.name = event.target.value;
        setData(newData);
    }
    const handleWhatsappChange = (event) => {
        const newData = {...data};
        newData["whatsapp"] = event.target.value;
        setData(newData);
    }
    const handleDiscordChange = (event) => {
        const newData = {...data};
        newData.discord = event.target.value;
        setData(newData);
    }
    const handleFacebookChange = (event) => {
        const newData = {...data};
        newData.facebook_link = event.target.value;
        setData(newData);
    }


    const saveBalanceWheelRequest = () => {
        let quesions = data.questions;
        let answers = [];
        let analytics = {};
        let currentDate = new Date()
        for (let quesion of quesions) {
            answers.push({"id_wheel_question":quesion.id, "mark":quesion.mark, "answer":JSON.stringify(quesion.answer)});
        }

        let balanceWheelSaveData = {
            'answers': {...answers},
            'email':data.email,
            'name':data.name,
            'whatsapp': data.whatsapp,
            'discord': data.discord,
            'facebook_link': data.facebook_link,
            'id_participant':sessionStorage.getItem('id_participant'),
            'current_date':currentDate,
            'img': canvasImg,
            'version':version
        };

        analytics.Remainder = data.remainder;

        for (const key in quesions) {
            analytics[quesions[key]['name']] = quesions[key]['mark'];
        }

        mixpanel.track('Email me press', analytics);
        APIService.saveBalanceWheelQuestions(balanceWheelSaveData)
            .then(response => {
                if (response.data.hash) {
                    sessionStorage.setItem('hash_participant', response.data.hash);
                    sessionStorage.setItem('id_participant', response.data.id);
                    mixpanel.identify(response.data.id);
                    AppReactPixel.trackCustomEvent('Lead');
                    // sessionStorage.removeItem('id_participant');
                    sessionStorage.removeItem('exported');
                }

                if (response.data.icsData) {
                    const anchor = document.createElement("a");
                    anchor.href = response.data.icsData;
                    anchor.download = response.data.icsName;
                    document.body.appendChild(anchor);
                    anchor.click();
                    document.body.removeChild(anchor);
                }

                let url = new URL(response.data.redirect);

                for (const key in quesions) {
                    url.searchParams.set(quesions[key]['name'], quesions[key]['mark']);
                }

                url.searchParams.set('idParticipant', response.data.id);
                url.searchParams.set('name', data.name);
                url.searchParams.set('Email', data.email);
                url.searchParams.set('Version', response.data.version);
                // window.location.href = url;
                // window.location.href = "/balance/wheel/thanks";
            })
            .catch(error => {

                // history("*");
                console.error('Error fetching data:', error);
            });
    };

    // const skipFeedbackBalanceWheelRequest = () => {
    //     history("/startReflections/" + sessionStorage.getItem('hash_participant'));
    // }

    return (
        <div className={'balance-wheel-save-div'}>
            <div className='balance-wheel-save-head'>
                <h2>
                    <div className={'life-sphere-icon-div'}>
                        <img className={'default'} src={defaultIcon}/>
                    </div>
                    <span>Your Wheel of Life Balance is Ready</span>
                </h2>
            </div>
            {/* <h3>How to Get Your Personalized Breakdown?</h3> */}
            <div className="graph">
                <canvas id="balance-wheel" width="360" height="310"></canvas>
            </div>
            <p>
            Thank you for your answers! They’ll be fundamental to our online coaching process.<br/> Based on your responses and results, we’ll guide you toward achieving your goals.
            </p>
            <p className='text-with-margin'>(Don’t worry—if you’d like to refine or update anything, just let us know anytime!)</p>
            <h3>How to start 1-1 coaching? </h3>
            <p>Simply choose a messenger:</p>
            <ul>
                {/* <li>            
                    <Checkbox
                                name={'active_email'}
                                text={'I prefer email'}
                                onchange={()=>setEmailActive(!emailActive)}
                            />
                            </li> */}
                <li>    <Checkbox
                                name={'active_whatsApp'}
                                text={'I prefer WhatsApp'}
                                onchange={()=>setWhatsappActive(!whatsappActive)}
                            /></li>
                <li>    <Checkbox
                                name={'active_discord'}
                                text={'I prefer Discord'}
                                onchange={()=>setDiscordActive(!discordActive)}
                            /></li>
                                            <li>    <Checkbox
                                name={'active_facebook'}
                                text={'I prefer Facebook'}
                                onchange={()=>setFacebookActive(!facebookActive)}
                            /></li>
            </ul>
            <div className='inputs-block'>
            <Input
                name={'name'}
                onchange={handleNameChange}
                placeholder={'[Your Full Name]*'}
            />
            {emailActive && (reevaluate ? (
                <Input
                    name={'email'}
                    disabled={isEmailDisabled}
                    value={email}
                    onchange={handleEmailChange}
                    placeholder={'[Your e-mail]'}
                />
            ) : (
                <Input
                    name={'email'}
                    onchange={handleEmailChange}
                    placeholder={'[Your e-mail]'}
                />
            ))}
{whatsappActive && (<Input
                name={'whatsapp'}
                onchange={handleWhatsappChange}
                placeholder={'[Your Whatsapp]'}
            />)}
            {discordActive && (                        <Input
                name={'discord'}
                onchange={handleDiscordChange}
                placeholder={'[Your Discord]'}
            />)}
            {facebookActive && (                        <Input
                name={'facebook_link'}
                onchange={handleFacebookChange}
                placeholder={'[Your Facebook Profile Link]'}
            />)}
            </div>
            {emailActive && !isEmailValid && <p style={{ color: 'red' }}>Please enter a valid email address.</p>}
            <p>👉We’ll reach out within one working day and get started! 👈</p>
            <div className='buttons-block'>
            <Link to="/balance/wheel/thanks">
                <SaveButton
                text={'Let’s Get Started!'}
                onclick={saveBalanceWheelRequest}
                disabled={isButtonDisabled}
            />
                </Link>     

            {/* <button className={'save-button'} onClick={skipFeedbackBalanceWheelRequest}><strong>Get More Information</strong></button> */}
            </div>
        </div>
    );
}