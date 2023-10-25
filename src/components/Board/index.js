import React from 'react';
import Letter from '../Letter';
import './Board.css';

export default function Board(props) {
    const { currentWordListSelected } = props;

    return (
        <div className='board'>
            {currentWordListSelected.map((currentValue, idx) => (
                <Letter currentValue={currentValue.value} status={currentValue.status} key={idx} />
            ))}
        </div>
    );
}
