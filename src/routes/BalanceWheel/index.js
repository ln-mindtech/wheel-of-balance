import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate} from 'react-router-dom';
import axios from 'axios';
import './balanceWheel.css';
import {Button} from "../../components/Button";
import {renderWheel} from "./utils";
import APIService from '../../service/APIService';
import AppReactGa from '../../service/AppReactGa';
import arrowLeft from '../../images/arrow-alt-circle-left-solid.svg';
import arrowRight from '../../images/arrow-alt-circle-right-solid.svg';
import mixpanel from 'mixpanel-browser';
import {Textarea} from "../../components/Textarea";
import {SkipButton} from "../../components/SkipButton/SkipButton";
import {NextButton} from "../../components/NextButton/NextButton";
import src from "../../images/life-sphere/default.png";
import AppReactPixel from "../../service/AppReactPixel";

export const BalanceWheel = ({setData}) => {
    let history = useNavigate();

    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [responseData, setResponseData] = useState(null);
    const [questionIndex, setQuestionIndex] = useState(0);

    const [questionMark, setQuestionMark] = useState(0);
    const [gaEvent, setGaEvent] = useState(0);

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const maxMarkValue = 10;
    const version = 1;

    useEffect(() => {
        if (sessionStorage.getItem('email')) {
            sessionStorage.setItem('reevaluate', true);
        }

        if (!sessionStorage.getItem('version') || sessionStorage.getItem('version') !== version) {
            sessionStorage.setItem('version', version);
        }

        if (sessionStorage.getItem('reevaluate')) {
            APIService.getWheelDataByHash(sessionStorage.getItem('hash_participant'))
                .then(response => {
                    sessionStorage.setItem('id_participant', response.data.id);

                    setResponseData(response.data);
                })
                .catch(error => {
                    history("*");
                    console.error('Error fetching data:', error);
                });
        } else {
            APIService.getBalanceWheelQuestions()
                .then(response => {
                    setResponseData(response.data);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                    history("*");
                });
        }
    }, []);

    useEffect(() => {
        if (responseData) {
            renderWheel(responseData, maxMarkValue);
            if (!responseData?.questions[questionIndex].mark) {
                setIsButtonDisabled(true);
            } else {
                setIsButtonDisabled(false);
            }
            ga();
        }
    }, [responseData, questionMark]);

    const ga = () => {
        if (!gaEvent) {
            let lifeSphere = responseData.questions[questionIndex].name;

            document.title = 'Mindtech - Welcome ' + lifeSphere;
            AppReactGa.balanceWheelSphere(lifeSphere);
            setGaEvent(1);
        }
    }

    const pnNexPageClick = () => {
        if (!sessionStorage.getItem('hash_participant') || !sessionStorage.getItem('id_participant')) {
            APIService.createParticipant()
                .then(response => {
                    if (response.data.hash) {
                        sessionStorage.setItem('hash_participant', response.data.hash);
                        sessionStorage.setItem('id_participant', response.data.id);
                    }
                });
        }
        mixpanel.track('Next Button press', {
            'Sphere': responseData.questions[questionIndex].name
        });
        AppReactPixel.trackCustomEvent('QuizClick');
        if (responseData?.questions[questionIndex + 1].mark === undefined) {
            setIsButtonDisabled(true);
        } else {
            setIsButtonDisabled(false);
        }
        handleQuestionIndex(questionIndex + 1);
    };

    const handleQuestionIndex = (newQuestionIndex) => {
        setQuestionIndex(newQuestionIndex);
        ga();
        setGaEvent(0);
    }

    const pnPrevPageClick = () => {
        if (!responseData?.questions[questionIndex - 1].mark) {
            setIsButtonDisabled(true);
        } else {
            setIsButtonDisabled(false);
        }
        handleQuestionIndex(questionIndex - 1);
    }

    const changeMarkClick = (mark) => {
        responseData.questions[questionIndex].mark = mark;
        setQuestionMark(mark);
        setData(responseData);
        setIsButtonDisabled(false);
        renderWheel(responseData, maxMarkValue);
        mixpanel.track('Mark tracked', {
            'Sphere': responseData.questions[questionIndex].name,
            'Mark': mark
        });
    };

    const renderRateItems = () => {
        return Array.from({ length: maxMarkValue }, (_, index) => (
            <div>
                {responseData.questions[questionIndex] && responseData.questions[questionIndex].mark == (index + 1) ? (
                    <div className={'rated'} key={index} onClick={() => changeMarkClick(index + 1)}>{index + 1}</div>
                ) : (
                    <div className={'rate'} key={index} onClick={() => changeMarkClick(index + 1)}>{index + 1}</div>
                )}
            </div>
        ));
    };

    const renderPagerDotsItems = () => {
            return Array.from({length: responseData.questions.length}, (_, index) => (
                <div className={'dot-div'}>
                    {index > questionIndex ? (
                        <span className={'dot-empty'} key={index}></span>
                    ) : (
                        <span className={index == questionIndex ? 'dot-selected' : 'dot'} key={index}></span>
                    )}

                </div>
            ));
    };

    const isLastItem = (questionIndex) => {
        return !((responseData.questions.length - 1) > questionIndex)
    }

    const onSkip = () => {
        if (!sessionStorage.getItem('hash_participant') || !sessionStorage.getItem('id_participant')) {
            APIService.createParticipant()
                .then(response => {
                    if (response.data.hash) {
                        sessionStorage.setItem('hash_participant', response.data.hash);
                        sessionStorage.setItem('id_participant', response.data.id);
                    }
                });
        }
        AppReactPixel.trackCustomEvent('QuizClick');
        let mark = 0;
        let isDisable = true;

        if (responseData.questions[questionIndex].mark !== undefined) {
            isDisable = false;
            mark = responseData.questions[questionIndex].mark;
        }

        // if (!responseData.questions[questionIndex].mark) {
        //     responseData.questions[questionIndex].mark = mark;
        // } else {
        //     mark = responseData.questions[questionIndex].mark;
        // }
        responseData.questions[questionIndex].mark = mark;
        changeMarkClick(mark);

        renderWheel(responseData, maxMarkValue);

        setIsButtonDisabled(isDisable);

        handleQuestionIndex(questionIndex + 1);
    }

    const onUpdateBalanceWheel = (isSkip = false) => {
        if (isSkip) {
            onSkip();
        }
        ga();
        let questions = responseData.questions;
        let answers   = [];

        for (let question of questions) {
            answers.push({"id_wheel_question":question.id, "mark":question.mark});
        }

        let balanceWheelAnswers = {
            'answers': {...answers},
            'id_participant':sessionStorage.getItem('id_participant'),
        };

        APIService.saveBalanceWheelAnswers(balanceWheelAnswers)
            .then(response => {

            })
            .catch(error => {
                history("*");
                console.error('Error fetching data:', error);
            });
    }

    const renderLifeSphereIcon = () => {
        let src = require('../../images/life-sphere/default.png'),
            iconName = responseData.questions[questionIndex].icon_name,
            isDefault = true;

        try {
            src = require('../../images/life-sphere/' + iconName + '.png');
            isDefault = false;
        } catch (error) {

        }

        return <img className={isDefault ? 'life-sphere-icon default' : 'life-sphere-icon'} src={src}/>;
    }

    return (
        <div>
            {responseData ? (
                <div className='balance-wheel-question'>
                    <div className='balance-wheel-head'>
                        <h1 style={{color: responseData.questions[questionIndex].color}}>
                            <div className={'life-sphere-icon-div'} style={{background: responseData.questions[questionIndex].color}}>
                                {renderLifeSphereIcon()}
                            </div>
                            <span>{responseData.questions[questionIndex].name}</span>
                        </h1>
                    </div>
                    <p className='description'>{responseData.questions[questionIndex].description}</p>
                    <h3><strong>{responseData.questions[questionIndex].question}</strong></h3>
                    <div className={'rates'}>
                        {renderRateItems()}
                    </div>
                    <div className="graph">
                        <canvas id="balance-wheel" width="350" height="290"></canvas>
                    </div>
                    <div className="buttons">
                        {isLastItem(questionIndex) ? (
                            <div className={'balance-wheel-skip-button'}>
                                <Link to="/save/balance/wheel/new" onClick={() => onUpdateBalanceWheel(true)}>
                                    <SkipButton text={'Skip'} onclick={onSkip}/>
                                </Link>
                            </div>
                        ) : (
                            <SkipButton text={'Skip'} onclick={onSkip}/>
                        )}
                        {isLastItem(questionIndex) ? (
                            <div>
                                {responseData.questions[questionIndex].mark ? (
                                    <Link to="/save/balance/wheel/new">
                                        <NextButton text={'Next'} onclick={() => onUpdateBalanceWheel()}/>
                                    </Link>
                                ) : (
                                    <NextButton text={'Next'} onclick={pnNexPageClick} disabled={isButtonDisabled}/>
                                )}
                            </div>
                        ) : (
                            <NextButton text={'Next'} onclick={pnNexPageClick} disabled={isButtonDisabled}/>
                        )}
                    </div>
                </div>
            ) : (
                <p className="wheel-loading">Loading data...</p>
            )}
        </div>
    );
}