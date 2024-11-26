import React from "react";
import './index.css';

export const SkipButton = ({ text, onclick, disabled }) => {
    if (disabled) {
        return (
            <button className={'skip-button-disabled'} disabled={disabled}>{text}</button>
        );
    } else {
        return (
            <button className={'skip-button'} onClick={onclick} disabled={disabled}>{text}</button>
        );
    }
}