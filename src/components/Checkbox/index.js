import React from "react";
import './checkbox.css';

export const Checkbox = ({ name, value, text, onchange }) => {
    return (
        <div className="check-div">
            <label>
                <input
                    id={'input-item-' + name}
                    name={name}
                    value={value}
                    type="checkbox"
                    className={'checkbox'}
                    onChange={onchange}
                />
                {text}
            </label>

        </div>
    );
}