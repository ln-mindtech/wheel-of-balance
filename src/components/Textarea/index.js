import React from "react";
import './index.css';

const DEFAULT_ROWS = 2;

export const Textarea = ({ name, value, placeholder, onchange, defaultValue, disabled, className, rows }) => {
    if (!rows) {
        rows = DEFAULT_ROWS
    }
    return (
        <textarea
            id={'input-item-' + name}
            name={name}
            value={value}
            className={className}
            placeholder={placeholder}
            onChange={onchange}
            defaultValue={defaultValue}
            disabled={disabled}
            rows={rows}
        />
    );
}