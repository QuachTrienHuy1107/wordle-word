import { cloneDeep } from 'lodash';
import { useEffect, useState } from 'react';
import './App.css';
import Board from './components/Board';
import Keyboard from './components/Keyboard';
import { ReplaceCharacter, STATUS } from './constants';
import { WORD_LIST, WORD_TODAY } from './data';

let currentIndex = 0;
let currentLine = 0;


function App() {
    const [currentWordListSelected, setCurrentWordListSelected] = useState(
        new Array(30).fill({
            status: "",
            value: ""
        }));
    const [word, setWord] = useState("");
    const isDone = word === WORD_TODAY;

    useEffect(() => {
        const handleTyping = (e) => {
            e.preventDefault();
            const value = e.key.toUpperCase();
            handleSelectKey(value);
        };
        window.addEventListener('keyup', handleTyping);

        return () => window.removeEventListener('keyup', handleTyping);
    }, [currentWordListSelected]);

    const handleSelectKey = (item) => {
        if (word.length === 0 && (item === "DEL" || item === "BACKSPACE" || item === "ENTER")) return;
        if (word.length === 5 && item.length < 2) return;

        let newArray = cloneDeep(currentWordListSelected);

        //Handle Delete
        if ((item === "DEL" || item === "BACKSPACE") && currentIndex > 0) {
            --currentIndex;
            newArray[currentIndex] = { ...newArray[currentIndex], value: "" };
            setCurrentWordListSelected(newArray);
            setWord(prev => prev.slice(0, -1));
            return;
        }
        //Handle Enter
        if (item === "ENTER" && currentIndex > 0) {
            if (WORD_LIST.includes(word)) {
                let newWord = cloneDeep(word);
                for (let i = 0; i < newWord.length; i++) {
                    if (WORD_TODAY[i] !== newWord[i]) {
                        newWord = ReplaceCharacter(newWord, i, "!");
                    }

                }
                let idx = 0;
                for (let i = currentLine; i < currentIndex; i++) {
                    if (isDone) {
                        newArray[i] = { ...newArray[i], status: STATUS.correctPos };
                    } else if (newArray[i].value === newWord[idx]) {
                        newArray[i] = { ...newArray[i], status: STATUS.correctPos };
                    } else if (WORD_TODAY.includes(newArray[i].value)) {
                        newArray[i] = { ...newArray[i], status: STATUS.wrongPos };
                    } else {
                        newArray[i] = { ...newArray[i], status: STATUS.normal };
                    }
                    idx++;
                }
                setCurrentWordListSelected(newArray);
                if (isDone) {
                    alert("GENIUS");
                    return;
                }
                setWord("");
                currentLine = currentIndex;

            } else if (word.length < 5) {
                alert("NOT ENOUGH");
            } else {
                alert("WRONG! TRY AGAIN");
            }
            return;
        }

        if (!/^[a-zA-Z]{1}$/.test(item)) return;

        // Set data
        newArray[currentIndex] = { ...newArray[currentIndex], value: item };
        // newArray[currentIndex].value = item; why it not work correctly?
        setCurrentWordListSelected(newArray);
        setWord(prev => prev += item);
        currentIndex++;
    };


    return (
        <div className='wrapper'>
            <Board currentWordListSelected={currentWordListSelected} />
            <Keyboard handleSelectKey={handleSelectKey} currentWordsInWorkToday={
                [...new Set(currentWordListSelected.filter(word => word.status === STATUS.correctPos))]
                    .map(word => word.value)}
            />
        </div>
    );
}

export default App;
