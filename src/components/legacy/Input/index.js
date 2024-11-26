import React from "react";
import './input.css';

export const Input = ({ name, value, placeholder, onchange, defaultValue, disabled, required }) => {
    return (
        <input
            id={'input-item-' + name}
            name={name}
            value={value}
            type="input"
            className={'legacy-input'}
            placeholder={placeholder}
            onChange={onchange}
            defaultValue={defaultValue}
            disabled={disabled}
            required={required}
        />
    );
}