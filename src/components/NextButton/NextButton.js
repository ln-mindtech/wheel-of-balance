import React from "react";
import './index.css';

export const NextButton = ({ text, onclick, disabled }) => {
    if (disabled) {
        return (
            <button className={'next-button-disabled'} disabled={disabled}>{text}</button>
        );
    } else {
        return (
            <button className={'next-button'} onClick={onclick} disabled={disabled}>{text}</button>
        );
    }
}