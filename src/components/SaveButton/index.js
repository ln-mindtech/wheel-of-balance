import React from "react";
import './index.css';

export const SaveButton = ({ text, onclick, disabled }) => {
    if (disabled) {
        return (
            <button className={'save-button-disabled'} disabled={disabled}><strong>{text}</strong></button>
        );
    } else {
        return (
            <button className={'save-button'} onClick={onclick} disabled={disabled}><strong>{text}</strong></button>
        );
    }
}