import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate} from 'react-router-dom';
import axios from 'axios';
import './balanceWheel.css';
import {Button} from "../../../components/legacy/Button";
import {renderWheel} from "./utils";
import APIService from '../../../service/APIService';
import AppReactGa from '../../../service/AppReactGa';
import arrowLeft from '../../../images/arrow-alt-circle-left-solid.svg';
import arrowRight from '../../../images/arrow-alt-circle-right-solid.svg';
import mixpanel from 'mixpanel-browser';
import AppReactPixel from "../../../service/AppReactPixel";

export const LegacyBalanceWheel = ({setData}) => {
    let history = useNavigate();

    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [responseData, setResponseData] = useState(null);
    const [questionIndex, setQuestionIndex] = useState(0);

    const [questionMark, setQuestionMark] = useState(0);
    const [gaEvent, setGaEvent] = useState(0);

    const location = useLocation();
    const version = 3;
    const queryParams = new URLSearchParams(location.search);

    const maxMarkValue = 10;
    useEffect(() => {
        if (sessionStorage.getItem('email')) {
            sessionStorage.setItem('reevaluate', true);
        }

        if (!sessionStorage.getItem('version') || sessionStorage.getItem('version') !== version) {
            sessionStorage.setItem('version', version);
        }

        if (sessionStorage.getItem('reevaluate')) {
            APIService.getWheelDataByHash(sessionStorage.getItem('hash_participant'), version)
                .then(response => {
                    sessionStorage.setItem('id_participant', response.data.id);

                    setResponseData(response.data);
                })
                .catch(error => {
                    history("*");
                    console.error('Error fetching data:', error);
                });
        } else {
            APIService.getBalanceWheelQuestions({'version':version})
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

            document.title = 'Mindtech - Welcome Old version ' + lifeSphere;
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
        AppReactPixel.trackCustomEvent('QuizClick');
        mixpanel.track('Next Button press', {
            'Sphere': responseData.questions[questionIndex].name
        });
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
        AppReactPixel.trackCustomEvent('QuizClick');
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
                    <div className={'legacy-rated'} key={index} onClick={() => changeMarkClick(index + 1)}>{index + 1}</div>
                ) : (
                    <div className={'legacy-rate'} key={index} onClick={() => changeMarkClick(index + 1)}>{index + 1}</div>
                )}
            </div>
        ));
    };

    const renderPagerDotsItems = () => {
            return Array.from({length: responseData.questions.length}, (_, index) => (
                <div className={'legacy-dot-div'}>
                    {index > questionIndex ? (
                        <span className={'legacy-dot-empty'} key={index}></span>
                    ) : (
                        <span className={index == questionIndex ? 'legacy-dot-selected' : 'legacy-dot'} key={index}></span>
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
        }

        if (!responseData.questions[questionIndex].mark) {
            responseData.questions[questionIndex].mark = mark;
        } else {
            mark = responseData.questions[questionIndex].mark;
        }
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

    return (
        <div>
            {responseData ? (
                <div className='legacy-balance-wheel-question'>
                    <h1>{responseData.questions[questionIndex].name}</h1>
                    <p>{responseData.questions[questionIndex].question}</p>
                    <div className={'legacy-rates'}>
                        {renderRateItems()}
                    </div>
                    <div className="legacy-graph">
                        <canvas id="balance-wheel" width="350" height="310"></canvas>
                    </div>
                    {isLastItem(questionIndex) ? (
                        <div>
                            {responseData.questions[questionIndex].mark ? (
                                <Link to="/save/balance/wheel">
                                    <Button text={'See Result'} onclick={() => onUpdateBalanceWheel()}/>
                                </Link>
                            ) : (
                                <Button text={'See Result'} onclick={pnNexPageClick} disabled={isButtonDisabled}/>
                            )}
                        </div>
                    ) : (
                        <Button text={'Next'} onclick={pnNexPageClick} disabled={isButtonDisabled}/>
                    )}
                    {
                        (!sessionStorage.getItem('email')) ? (
                            isLastItem(questionIndex) ? (
                                <div className={'legacy-balance-wheel-skip-button'}>
                                    <Link to="/save/balance/wheel" onClick={() => onUpdateBalanceWheel(true)}>
                                        Skip And See Result
                                    </Link>
                                </div>
                            ) : (
                                <div className={'legacy-balance-wheel-skip-button'}>
                                    <a onClick={onSkip}>Skip</a>
                                </div>
                            )
                        ) : (
                            <div className={'legacy-dots-div'}>
                                <div className={'legacy-left-div'}>
                                    {questionIndex > 0 ? (
                                        <img className={'legacy-left'} src={arrowLeft} onClick={pnPrevPageClick}/>
                                    ) : (
                                        <div></div>
                                    )}
                                </div>
                                {/*{renderPagerDotsItems()}*/}
                                <div className={'legacy-right-div'}>
                                    {(questionIndex + 1 == responseData.questions.length ||
                                        responseData.questions[questionIndex].mark === undefined) ? (
                                        <img className={'legacy-right-disabled'} src={arrowRight}/>
                                    ) : (
                                        <img className={'legacy-right'} src={arrowRight} onClick={pnNexPageClick}/>
                                    )}
                                </div>
                            </div>
                        )
                    }
                </div>
            ) : (
                <p>Loading data...</p>
            )}
        </div>
    );
}