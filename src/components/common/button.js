import React from 'react';
import "./button.css"

export function Button(props) {
    
    const classNames = "btn " + props.className;

    return (
        <button
            {...props}
            className={classNames}
        >
            {props.children}
        </button>
    );
}

export function ButtonClose(props) {
    return <Button {...props} className="btn-close">&times;</Button>
}
