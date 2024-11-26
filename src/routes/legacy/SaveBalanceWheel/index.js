import React, { useState, useEffect } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import './saveBalanceWheel.css';
import {Button} from "../../../components/legacy/Button";
import {Input} from "../../../components/legacy/Input";
import {Checkbox} from "../../../components/legacy/Checkbox";
import {renderWheel} from "../BalanceWheel/utils";
import APIService from "../../../service/APIService";
import mixpanel from 'mixpanel-browser';
import AppReactPixel from "../../../service/AppReactPixel";

export const LegacySaveBalanceWheel = ({data, setData}) => {
    const [canvasImg, setCanvasImg] = useState();
    const [currentDate, setCurrentDate] = useState(new Date());
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isEmailDisabled, setEmailDisabled] = useState(false);
    const reevaluate = sessionStorage.getItem('reevaluate');
    let history = useNavigate();
    let email = sessionStorage.getItem('email');
    let isRenderWheel = true;
    const version = sessionStorage.getItem('version') ?? 3;

    if (!data) {
        data = [];
        isRenderWheel = false;
        APIService.getWheelDataByHash(sessionStorage.getItem('hash_participant'), version)
            .then(response => {
                setData(response.data);
                const wheel = renderWheel(response.data, maxMarkValue);
                setCanvasImg(wheel);
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

    const maxMarkValue = 10;
    useEffect(() => {
        if (isRenderWheel) {
            const wheel = renderWheel(data, maxMarkValue);
            setCanvasImg(wheel);
        }
    }, []);

    useEffect(() => {
        if (reevaluate) {
            setEmailDisabled(true);
            setIsButtonDisabled(false);
        }
    })

    const handleEmailChange = (event) => {
        data.email = event.target.value;
        sessionStorage.setItem('email', event.target.value);
        setData(data);

        // Check if the entered email is valid
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setIsEmailValid(emailPattern.test(event.target.value));
        setIsButtonDisabled(!emailPattern.test(event.target.value));
    };

    const handleRemindChange = (event) => {
        if (event.target.checked) {
            mixpanel.track('Remainder set');
            data.remainder = 'set';
        } else {
            mixpanel.track('Remainder unset');
            data.remainder = 'unset';
        }

        data.isRemind = event.target.checked;
        setData(data);
    };

    const saveBalanceWheelRequest = () => {
        let quesions = data.questions;
        let answers = [];
        let analytics = {};
        let currentDate = new Date()
        for (let quesion of quesions) {
            answers.push({"id_wheel_question":quesion.id, "mark":quesion.mark});
        }

        let balanceWheelSaveData = {
            'answers': {...answers},
            'email':data.email,
            'id_participant':sessionStorage.getItem('id_participant'),
            'is_remind':data.isRemind,
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
                url.searchParams.set('Email', data.email);
                url.searchParams.set('Version', response.data.version);

                window.location.href = url;
            })
            .catch(error => {
                history("*");
                console.error('Error fetching data:', error);
            });
    };

    return (
        <div className={'legacy-balance-wheel-save-div'}>
            <h1>My Balance Wheel</h1>
            <p>{currentDate.toDateString()}</p>
            <div className="legacy-graph">
                <canvas id="balance-wheel" width="360" height="310"></canvas>
            </div>
            <p>
                With this powerful instrument you highlighted the areas of life
                that require your attention for a happier and more balanced life. Save the wheel to your email to continue using it and track your progress.
            </p>
            {reevaluate ? (
                <Input
                    name={'email'}
                    value={email}
                    disabled={isEmailDisabled}
                    onchange={handleEmailChange}
                    placeholder={'Your e-mail'}
                />
            ) : (
                <Input
                    name={'email'}
                    onchange={handleEmailChange}
                    placeholder={'Your e-mail'}
                />
            )}

            {!isEmailValid && <p style={{ color: 'red' }}>Please enter a valid email address.</p>}
            <Checkbox
                name={'is_remind'}
                text={'Set a reminder for me to take another self-assessment in one month'}
                onchange={handleRemindChange}
            />
            <Button
                text={'Email me my personal balance wheel'}
                onclick={saveBalanceWheelRequest}
                disabled={isButtonDisabled}
            />
        </div>
    );
}