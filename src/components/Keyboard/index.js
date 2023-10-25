import React from 'react';
import { KEYBOARD_LINE1, KEYBOARD_LINE2, KEYBOARD_LINE3 } from '../../data';
import Key from '../Key';
import './Keyboard.css';

export default function Keyboard(props) {
    const { handleSelectKey, currentWordsInWorkToday } = props;

    return (
        <div className='keyboard'>
            <div className='key-line'>
                {KEYBOARD_LINE1.map((item, idx) => (
                    <Key
                        item={item}
                        key={idx}
                        handleSelectKey={handleSelectKey}
                        isSelected={currentWordsInWorkToday.includes(item)}
                    />
                ))}
            </div>

            <div className='key-line'>
                {KEYBOARD_LINE2.map((item, idx) => (
                    <Key
                        item={item}
                        key={idx}
                        handleSelectKey={handleSelectKey}
                        isSelected={currentWordsInWorkToday.includes(item)}
                    />
                ))}
            </div>

            <div className='key-line'>
                {KEYBOARD_LINE3.map((item, idx) => (
                    <Key
                        item={item}
                        key={idx}
                        handleSelectKey={handleSelectKey}
                        isSelected={currentWordsInWorkToday.includes(item)}
                    />
                ))}
            </div>
        </div>
    );
}
