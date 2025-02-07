import React, { useState, useEffect } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import './reflection.css';
import {Button} from "../../components/Button";
import { useParams } from 'react-router-dom';

import APIService from "../../service/APIService";
import {Input} from "../../components/Input";

import arrowLeft from '../../images/arrow-alt-circle-left-solid.svg';
import arrowRight from '../../images/arrow-alt-circle-right-solid.svg';
import startReflectionsImage from "../../images/winhuman.svg";
import mixpanel from 'mixpanel-browser';

const Reflection = () => {
    const { id } = useParams();
    let history = useNavigate();

    const [reflectionsData, setReflectionsData] = useState(null);
    const [responseData, setResponseData] = useState(null);
    const [answersData, setAnswersData] = useState(null);
    const [questionIndex, setQuestionIndex] = useState(0);
    const [nextQuestionIndex, setNextQuestionIndex] = useState(0);
    const [pageIndex, setPageIndex] = useState(id);
    const [isDataUpdated, setDataUpdated] = useState(false);

    const defaultFormData = {
        answer1: '',
        answer2: '',
        answer3: '',
        answer4: '',
        answer5: '',
    };

    const [formData, setFormData] = useState(defaultFormData);

    useEffect(() => {
        APIService.getReflectionQuestions(sessionStorage.getItem('id_participant'), pageIndex)
            .then(response => {
                setResponseData(response.data);
                setQuestionIndex(nextQuestionIndex);
            })
            .catch(error => {
                history("*");
                console.error('Error fetching data:', error);
            });
    }, [pageIndex]);

    useEffect(() => {
        APIService.getReflections(sessionStorage.getItem('id_participant'))
            .then(response => {
                setReflectionsData(response.data.reflections);
            })
            .catch(error => {
                history("*");
                console.error('Error fetching data:', error);
            });
    }, []);

    useEffect(() => {
        if (responseData) {
            setFormData(defaultFormData);
                APIService.getReflectionQuestionsAnswers(sessionStorage.getItem('id_participant'))
                    .then(response => {
                        setAnswersData({...response.data.questions, ...answersData});
                        const currentAnswer = response.data.questions[responseData.questions[questionIndex].id_reflection_question];
                       setFormData(prevState => ({
                           ...prevState,
                           ...(currentAnswer.reduce((acc, item, index) => {
                               acc[`answer${index + 1}`] = item.caption_reflections_answers
                               return acc;
                           }, {}))
                       }))
                    })
                    .catch(error => {
                        history("*");
                        console.error('Error fetching data:', error);
                    });

        }
    }, [responseData]);

    useEffect(() => {
        if (answersData) {
            const currentAnswer = answersData[responseData.questions[questionIndex].id_reflection_question];
            setFormData(prevState => ({
                ...prevState,
                ...(currentAnswer.reduce((acc, item, index) => {
                    acc[`answer${index + 1}`] = item.caption_reflections_answers
                    return acc;
                }, {}))
            }))
        }
    }, [questionIndex,answersData]);

    function getCurrentAnswersCount() {
        let total = 0;
        const currentAnswer = answersData[responseData.questions[questionIndex].id_reflection_question];
        currentAnswer.map(function(element){
            if (element.caption_reflections_answers) {
                total = total + 1;
            }
        });
        return total;
    }

    function getCurrentSphereAnswersCount() {
        let total = 0;

        for (const key in answersData) {
            for (const qkey in answersData[key]) {
                if (answersData[key][qkey].caption_reflections_answers &&
                    answersData[key][qkey].id_life_sphere == responseData.questions[questionIndex].id_life_sphere
                ) {
                    total = total + 1;
                }
            }
        }

        return total;
    }

    function sendAnalytics(name) {
        mixpanel.track(name, {
            'Sphere': responseData.questions[questionIndex].name_life_sphere,
            'Question': (questionIndex + 1),
            'Reflections': getCurrentAnswersCount()
        });
    }

    const pnChangeSphere = (id) => {
        //counts previous answers before change sphere!
        let answersCount = getCurrentSphereAnswersCount();

        setPageIndex(id);
        setFormData(defaultFormData);
        setNextQuestionIndex(0);

        mixpanel.track('Go to Sphere', {
            'From': responseData.questions[questionIndex].name_life_sphere,
            'To': reflectionsData[(id - 1)].name_life_sphere,
            'Reflections': answersCount
        });

        onSaveReflections();

        sendAnalytics('Reflection Next Button press');
    };

    const pnNextSphereClick = () => {
        if (pageIndex >= reflectionsData.length) {
            setPageIndex(1);
        } else {
            setPageIndex(parseInt(pageIndex) + 1);
            history(`/reflection/${questionIndex + 1}`);
        }

        onSaveReflections();

        setFormData(defaultFormData);
        setNextQuestionIndex(0);

        sendAnalytics('Arrow RIGHT tracked');
    }

    const btnNextSphereClick = () => {
        onSaveReflections();

        setFormData(defaultFormData);
        setNextQuestionIndex(0);

        sendAnalytics('Reflection Next Button press');
        if (pageIndex >= reflectionsData.length) {
            setPageIndex(1);
        } else {
            setPageIndex(parseInt(pageIndex) + 1);
            history(`/`);
        }
    }

    const pnPrevSphereClick = () => {
        if (pageIndex == 1) {
            setPageIndex(reflectionsData.length);
        } else {
            setPageIndex(parseInt(pageIndex) - 1);
        }
        setFormData(defaultFormData);
        setNextQuestionIndex(3);

        onSaveReflections();

        sendAnalytics('Arrow LEFT tracked');
    }

    const pnNexPageClick = () => {
        setFormData(defaultFormData);
        setQuestionIndex(questionIndex + 1);

        onSaveReflections();

        sendAnalytics('Arrow RIGHT tracked');
    }

    const btnNextPageClick = () => {
        setFormData(defaultFormData);
        setQuestionIndex(questionIndex + 1);

        onSaveReflections();

        sendAnalytics('Reflection Next Button press');
    }

    const pnPrevPageClick = () => {
        setFormData(defaultFormData);
        setQuestionIndex(questionIndex - 1);

        onSaveReflections();

        sendAnalytics('Arrow LEFT tracked');
    }

    const onSaveReflections = () => {
        if (isDataUpdated) {
            APIService.saveReflections(sessionStorage.getItem('id_participant'), answersData)
                .then(response => {
                    setDataUpdated(false);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        }
    }

    const onChangeFormData = (name, index) => (e) => {
        const {value} = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }))

        const id = responseData.questions[questionIndex].id_reflection_question;

        answersData[id][index - 1] = {
            'caption_reflections_answers': value,
            'id_reflection_question': id,
        };
        setAnswersData(answersData);
        setDataUpdated(true);
    }

    const saveReflectionRequest = () => {
        sessionStorage.setItem('exported', '');
        sendAnalytics('Save and Finish');
        APIService.saveReflections(sessionStorage.getItem('id_participant'), answersData)
            .then(response => {
                history("/reflections/");
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };

    const renderPagerDotsItems = () => {
        return Array.from({length: responseData.questions.length}, (_, index) => (
            <div className={'dot-div'}>
                {index > questionIndex ? (
                    <span className={'dot-empty'} key={index}></span>
                ) : (
                    <span className={index == questionIndex ? 'dot-selected' : 'dot'} key={index}
                          onClick={() => setQuestionIndex(index)}></span>
                )}

            </div>
        ));
    };

    return (
        <div>
        {responseData ? (
            <div>
                <h1>
                    {responseData.questions[questionIndex].name_life_sphere}
                    <span>{responseData.questions[questionIndex].balance_wheels_mark}</span>
                </h1>
                <p>{responseData.questions[questionIndex].caption_reflection_question}</p>

                <div className={'answer-div'}>
                    <span>1.</span>
                    <Input
                        onchange={onChangeFormData('answer1', 1)}
                        placeholder={'Your answer'}
                        value={formData.answer1}
                    />
                </div>
                <div className={'answer-div'}>
                    <span>2.</span>
                    <Input
                        onchange={onChangeFormData('answer2', 2)}
                        placeholder={'Your answer'}
                        value={formData.answer2}
                        disabled={!formData.answer1}
                    />
                </div>
                <div className={'answer-div'}>
                    <span>3.</span>
                    <Input
                        onchange={onChangeFormData('answer3', 3)}
                        placeholder={'Your answer'}
                        value={formData.answer3}
                        disabled={!formData.answer2}
                    />
                </div>
                <div className={'answer-div'}>
                    <span>4.</span>
                    <Input
                        onchange={onChangeFormData('answer4', 4)}
                        placeholder={'Your answer'}
                        value={formData.answer4}
                        disabled={!formData.answer3}
                    />
                </div>
                <div className={'answer-div'}>
                    <span>5.</span>
                    <Input
                        onchange={onChangeFormData('answer5', 5)}
                        placeholder={'Your answer'}
                        value={formData.answer5}
                        disabled={!formData.answer4}
                    />
                </div>
                <div>
                    {questionIndex + 1 < responseData.questions.length && id ? (
                        <Button
                            text={'Next'}
                            onclick={btnNextPageClick}
                        />
                    ) : (
                        <Button
                            text={'Next'}
                            onclick={btnNextSphereClick}
                        />
                    )}
                </div>

                <div className={'dots-div'}>
                    <div className={'left-div'}>
                        {questionIndex > 0 ? (
                            <img className={'left'} src={arrowLeft} onClick={pnPrevPageClick}/>
                        ) : (
                            <img className={'left'} src={arrowLeft} onClick={pnPrevSphereClick}/>
                        )}
                    </div>
                    {renderPagerDotsItems()}
                    <div className={'right-div'}>
                        {questionIndex + 1 == responseData.questions.length ? (
                            <img className={'right'} src={arrowRight} onClick={pnNextSphereClick}/>
                        ) : (
                            <img className={'right'} src={arrowRight} onClick={pnNexPageClick}/>
                        )}
                    </div>
                </div>

                <p className={'save-for-now-p'}>
                    <a onClick={saveReflectionRequest}>Save and finish for now</a>
                </p>
                <div>
                    {reflectionsData ? (
                        <div id="reflections" className={'reflection-progress-icons'}>
                            {reflectionsData.map((reflection, index) => {
                                return (
                                    <div className={'reflection-progress-icon-div'}>
                                        <p>{reflection.name_life_sphere}</p>
                                        {(pageIndex == index + 1) ? (
                                            <div className={'img-container-selected'}>
                                                <img className={'reflection-progress-icon-w'}
                                                     src={require('../../images/reflection/' + reflection.icon_name_life_sphere + '.png')}
                                                />
                                            </div>
                                        ) : (
                                            <div className={'img-container'}>
                                                <img className={'reflection-progress-icon-w'} onClick={() => pnChangeSphere(reflection.id_life_sphere)}
                                                     src={require('../../images/reflection/' + reflection.icon_name_life_sphere + '.png')}
                                                />
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <p>Loading data...</p>
                    )}
                </div>
            </div>
        ) : (
        <p>Loading data...</p>
        )}
        </div>
    );
}

export default Reflection