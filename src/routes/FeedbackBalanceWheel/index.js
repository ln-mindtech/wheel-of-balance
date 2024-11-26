import React, { useState, useEffect } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {Button} from "../../components/Button";

import './index.css';
import APIService from "../../service/APIService";
import {Input} from "../../components/Input";

import {Textarea} from "../../components/Textarea";

const FeedbackBalanceWheel = () => {
    let history = useNavigate();

    const [answersData, setAnswersData] = useState([]);
    const [questions, setQuestions] = useState(null);

    useEffect(() => {
        APIService.getFeedbackBalanceWheelQuestions()
            .then(response => {
                setQuestions(response.data.questions);
            })
            .catch(error => {
                history("*");
                console.error('Error fetching data:', error);
            });
    }, []);

    const onChangeFormData = (id_question) => (e) => {
        const {value} = e.target;

        answersData[id_question] = {
            'value': value,
            'id_feedback_question': id_question,
        };

        setAnswersData(answersData);
    }

    const skipFeedbackBalanceWheelRequest = () => {
        history("/startReflections/" + sessionStorage.getItem('hash_participant'));
    }

    const saveFeedbackBalanceWheelRequest = () => {
        APIService.saveFeedbackBalanceWheelAnswers(sessionStorage.getItem('id_participant'), answersData)
            .then(response => {
                history("/startReflections/" + sessionStorage.getItem('hash_participant'));
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };

    const renderAnswerInput = (question) => {
        if (question.input_type == 'textarea') {
            return <Textarea
                onchange={onChangeFormData(question.id)}
                name={question.id}
                placeholder={'Your answer'}
                rows={6}
            />
        }

        return <Input
            onchange={onChangeFormData(question.id)}
            name={question.id}
            placeholder={'Your answer'}
        />
    }

    return (
        <div className={'feedback-balance-wheel'}>
            <h2>
                Please help us develop the product that will really make Your Life and the Lives of Thousands of Others better
            </h2>
            {questions ? (
                <div className={'feedback-questions'}>
                    {questions.map((question, index) => {
                        return (
                            <div>
                                <div className={'feedback-question'}>
                                    <p>{question.caption}</p>
                                </div>
                                <div className={'feedback-answer'}>
                                    {renderAnswerInput(question)}
                                </div>
                            </div>
                        );
                    })}
                    <div className={'feedback-buttons'}>
                        <div className={'feedback-button-send'}>
                            <Button
                                text={'Send'}
                                onclick={saveFeedbackBalanceWheelRequest}
                            />
                        </div>
                        <div className={'feedback-button-skip'}>
                            <a onClick={skipFeedbackBalanceWheelRequest}>Skip</a>
                        </div>
                    </div>
                </div>
            ) : (
                <p>Loading data...</p>
            )}
        </div>
    );
}

export default FeedbackBalanceWheel