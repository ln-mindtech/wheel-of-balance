import React, { useState, useEffect } from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import './reflections.css';
import backToWheeelIcon from '../../images/backToWheeelIcon.png';
import domtoimage from 'dom-to-image';
import mixpanel from 'mixpanel-browser';

import APIService from "../../service/APIService";
import {SaveButton} from "../../components/SaveButton";

const Reflections = ({data, setData}) => {
    const [responseData, setResponseData] = useState(null);
    let exported = sessionStorage.getItem('exported');
    const [isExported, setIsExported] = useState(exported);
    let history = useNavigate();
    const { hash } = useParams();
    const { id } = useParams();

    useEffect(() => {
        if (hash) {
            sessionStorage.setItem('hash_participant', hash);
            APIService.getParticipantByHash(hash)
                .then(response => {
                    sessionStorage.setItem('exported', 1);
                    sessionStorage.setItem('id_participant', response.data.id);

                    mixpanel.identify(response.data.id);
                    if (id) {
                        history("/reflection/"+id);
                    }
                    request();
                })
                .catch(error => {
                    history("*");
                    console.error('Error fetching data:', error);
                });
        } else {
            request();
        }
    }, [isExported]);

    function request() {
        APIService.getReflections(sessionStorage.getItem('id_participant'))
            .then(response => {
                setResponseData(response.data.reflections);
            })
            .catch(error => {
                history("*");
                console.error('Error fetching data:', error);
            });
    }

    const exportReflectionsRequest = () => {
        let counts = {};
        for (const key in responseData) {
            counts[responseData[key]['name_life_sphere']] = responseData[key]['reflections_answers_count'];
        }
        mixpanel.track('Export Reflections', counts);

        setIsExported('1');
        sessionStorage.setItem('exported', 1);
        domtoimage.toPng(document.getElementById('reflections'))
            .then(function (dataImg) {
                APIService.exportReflections(
                    sessionStorage.getItem('id_participant'),
                    sessionStorage.getItem('hash_participant'),
                    dataImg)
                    .then(response => {
                        //history("/reflections/");
                    })
                    .catch(error => {
                        history("*");
                        console.error('Error fetching data:', error);
                    });
            });
    };

    const sendAnalytics = (name, count) => {
        mixpanel.track('Go to Sphere', {
            'From': 'Reflection Progress',
            'To': name,
            'Reflections': count
        });
    };

    const sendGoBackAnalytics = () => {
        mixpanel.track('Back to Balance Wheel');
    };

    const renderExport = () => {
        return (
            <div>
                {isExported ? (
                    <p>Reflections have been sent to your email</p>
                ) : (
                    <Link to="/reflections">
                        <SaveButton
                            text={'Export Reflection'}
                            onclick={exportReflectionsRequest}
                        />
                    </Link>
                )}
            </div>
        );
    };

    return (
        <div className={'content-div'}>
            <Link to={`/ViewBalanceWheel/${sessionStorage.getItem('hash_participant')}`} onClick={sendGoBackAnalytics}>
                    <img className={'back-to-wheel-icon'} src={backToWheeelIcon} alt="backToWheeelIcon" />
                    <label className={"back-to-wheel"}>
                        Back to your Balance Wheel
                    </label>
            </Link>
            <h1>Reflection Progress</h1>
            <p>Choose the sphere to continue reflection</p>

            {responseData ? (
                <div className={'reflections-div'}>
                    <div id="reflections" className={'reflection-progress-icons'}>
                        {responseData.map((reflection, index) => {
                            return (
                                    <div className={'reflection-progress-icon-div'}>
                                        <Link to={`/reflection/${reflection.id_life_sphere}`}
                                              onClick={() => sendAnalytics(reflection.name_life_sphere, reflection.reflections_answers_count)}
                                        >
                                            <p>{reflection.name_life_sphere} <b>{reflection.balance_wheels_mark}</b></p>
                                            <img className={'reflection-progress-icon'}
                                                 src={require('../../images/reflection/' + reflection.icon_name_life_sphere + '.png')}
                                            />
                                            <p className={'p-mark-' + reflection.reflections_answers_count}>{reflection.reflections_answers_count}/20</p>
                                        </Link>
                                    </div>
                            );
                        })}
                    </div>
                    {renderExport()}
                </div>
            ) : (
                <p>Loading data...</p>
            )}
        </div>
    );
}

export default Reflections