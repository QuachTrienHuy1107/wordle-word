import React from 'react';
import './Key.css';

export default function Key(props) {
    const { item, handleSelectKey, isSelected } = props;


    return (
        <div className='key'
            style={{ backgroundColor: isSelected ? '#538d4e' : '#818384' }}
            onClick={() => handleSelectKey(item)}>
            {item}
        </div>
    );
}
