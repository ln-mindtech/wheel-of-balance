import React from "react";
import './button.css';

export const Button = ({ text, onclick, disabled }) => {
    if (disabled) {
        return (
            <button className={'legacy-button-disabled'} disabled={disabled}>{text}</button>
        );
    } else {
        return (
            <button className={'legacy-button'} onClick={onclick} disabled={disabled}>{text}</button>
        );
    }
}