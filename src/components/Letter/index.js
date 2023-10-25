import React from 'react';
import { STATUS } from '../../constants';
import './Letter.css';

export default function Letter(props) {
    const { currentValue, status } = props;

    let className = 'letter';

    if (status === STATUS.correctPos) {
        className += ' correct';
    } else if (status === STATUS.wrongPos) {
        className += ' wrongPos';
    } else if (status === STATUS.normal) {
        className += ' normal';
    }

    return (
        <div className={className}>
            {currentValue}
        </div>
    );
}
