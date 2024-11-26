import React from "react";
import './button.css';

export const Button = ({ text, onclick, disabled }) => {
    if (disabled) {
        return (
            <button className={'button-disabled'} disabled={disabled}>{text}</button>
        );
    } else {
        return (
            <button className={'button'} onClick={onclick} disabled={disabled}>{text}</button>
        );
    }
}