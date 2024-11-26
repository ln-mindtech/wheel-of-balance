import React, { useState } from "react";
import {useNavigate} from 'react-router-dom';
import './index.css';
import {Input} from "../Input";
import {Button} from "../Button";
import {Textarea} from "../Textarea";
import APIService from "../../service/APIService";

export const ContactFormer = () => {
    const [submitted, setSubmitted] = useState(false);
    const [ name, setName ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ message, setMessage ] = useState('')
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isMessage, setIsMessage] = useState(true);
    let history = useNavigate();

    const handleNameChange = (event) => {
        const value = event.target.value;

        setName(value);
    }

    const handleMessageChange = (event) => {
        const value = event.target.value;

        setMessage(value);
    }

    const handleEmailChange = (event) => {
        const value = event.target.value;

        // Check if the entered email is valid
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setIsEmailValid(emailPattern.test(value));
        setIsButtonDisabled(!emailPattern.test(value));
        setEmail(value)
    };

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!message) {
            setIsMessage(false);
            return false;
        }

        let values = {
            'name':name,
            'email':email,
            'message':message,
            'id_participant':sessionStorage.getItem('id_participant'),
        };

        APIService.saveFeedbackGeneral(values)
            .then(response => {

            })
            .catch(error => {
         
        });

        setSubmitted(true);
    }

    if (submitted) {
        return (
            <>
                <div className="text-2xl">Thank you!</div>
                <div className="text-md">We'll be in touch soon.</div>
            </>
        );
    }

    return (
        <div className='contact-form'>
            <div className='container'>
                <div className='row'>
                    <div>
                        <Input
                            name={'name'}
                            onchange={handleNameChange}
                            placeholder={'[Your name]'}
                            required={true}
                        />
                    </div>
                    <div className={'email'}>
                        <Input
                            name={'email'}
                            onchange={handleEmailChange}
                            placeholder={'[Your e-mail]'}
                            required={true}
                        />

                        {!isEmailValid && <p>Please enter a valid email address.</p>}
                    </div>
                    <div className={'request'}>
                        <Textarea
                            onchange={handleMessageChange}
                            name={message}
                            placeholder={'[Your request]'}
                            rows={6}
                        />
                        {!isMessage && <p>Please enter you request.</p>}
                    </div>
                </div>
                <div className={'send-request'}>
                    <Button
                        text={'Send your request'}
                        onclick={handleSubmit}
                        disabled={isButtonDisabled}
                    />
                </div>
            </div>
        </div>
    );
}