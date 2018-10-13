import React from 'react';
import "./checkbox.css";

export function Checkbox({children, name, value, onChange}) {

    const classNames = [
        'checkbox',
        value ? 'checked' : null
    ].filter(c => c != null).join(' ');

    return (
        <div className={classNames}>
            <label htmlFor={name} className="checkbox__label">
                <span className="checkbox__text">{children}</span>
                <input
                    className="checkbox__input"
                    type="checkbox"
                    id={name}
                    name={name}
                    checked={value}
                    onChange={onChange}
                />
            </label>
        </div>
    );
}
