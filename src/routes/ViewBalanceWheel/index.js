import React, { useState, useEffect } from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import './viewBalanceWheel.css';
import APIService from "../../service/APIService";
import {SaveButton} from "../../components/SaveButton";

export const ViewBalanceWheel = ({data, setData}) => {
    let history = useNavigate();

    const { hash } = useParams();
    sessionStorage.setItem('hash_participant', hash);
    const [responseData, setResponseData] = useState(null);

    useEffect(() => {
        if (hash) {
            APIService.getWheelDataByHash(hash)
                .then(response => {
                    sessionStorage.setItem('id_participant', response.data.id);
                    sessionStorage.setItem('email', response.data.email);
                    setResponseData(response.data);
                })
                .catch(error => {
                    history("*");
                    console.error('Error fetching data:', error);
                });
        } else {
            history("*");
        }
    }, []);

    return (
        <div className={'balance-wheel-div'}>
            {responseData ? (
                <div className={'balance-wheel-view-div'}>
                    <h1>My Balance Wheel</h1>
                    <p>{responseData.date}</p>
                    <img src={responseData.src} alt="Wheel" />
                    <p>
                        It is time to focus on taking action steps to improve areas that are causing imbalance in your life.
                        A balanced life leads to happiness and conscious life, and our aim is to assist you in achieving it.
                    </p>
                    <Link to={'/reflection/1'}>
                        <SaveButton text={'Let\'s start balancing my wheel'}/>
                    </Link>
                    <Link className={'reevaluate-balance-wheel-link'} to="/balanceWheel">
                        <div className={'reevaluate-balance-wheel'}>
                            <label>Reevaluate your balance wheel</label>
                        </div>
                    </Link>
                </div>
            ) : (
                <p>Loading data...</p>
            )}
        </div>
    );
}