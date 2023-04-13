// import React component, and the useEffect and useState hooks
import React, { useEffect, useState } from 'react';

/*  this function component places an event listener on the entire web
    document that listens for keydown events, and handles these events
**/ 
function KeyboardInput2 () {

    // set a state variable and it's value setter function with the useState hook
    // set the initial value of the state variable to ""
    const[inputValue, setInputValue] = useState("");
    const MAX_LENGTH = 9;
    const WORD_LENGTH = 7;
    const START_POS = Math.floor(MAX_LENGTH/2);
    const[wordArray, setWordArray] = useState(["*","*","*","*","*","*","*","*","*"]);
    const[cursorPos, setCursorPos] = useState(START_POS);

    // the useEffect hook is a lifecycle hook that handles actions when the
    // component is mounted - (is rendered)
    // this useEffect hook is telling this component to handle a keydown event
    useEffect ( () => {
        // how to handle the keydown event
        function handleKeyDown(event) {
            // get current inputValue
            const {key} = event;
            const k = event.which;
            
            var pattern = /[A-Za-z]/;
            // handle backspace key
            if (k === 8){
                var newInputValue = inputValue.slice(0, -1);
                setInputValue(inputValue => {return newInputValue;});
                var inputLength = newInputValue.length;
                var startPos = Math.floor((MAX_LENGTH - inputLength)/2);
                var i=0;
                var x=0;
                setWordArray( wordArray => {
                    while (i<startPos){
                        wordArray[i] = "*";
                        i++;
                    }
                    while (i>=startPos && x<inputLength){
                        wordArray[i] = newInputValue[x];
                        i++;
                        x++;
                    }
                    while (i>=inputLength && i < MAX_LENGTH){
                        wordArray[i] = "*";
                        i++;
                    }
                    return wordArray;
                });
                setCursorPos(cursorPos => { 
                    var cPos = MAX_LENGTH-1 - Math.floor((MAX_LENGTH - inputLength)/2);
                    return cPos;
                });
            }
            else if (inputValue.length >= WORD_LENGTH){
                // exit
                return true;
            }
            // Verify that the key entered is not a special key
            else if (k === 20 /* Caps lock */
                || k === 16 /* Shift */
                || k === 46 /* Delete */
                || k === 9 /* Tab */
                || k === 27 /* Escape Key */
                || k === 17 /* Control Key */
                || k === 91 /* Windows Command Key */
                || k === 19 /* Pause Break */
                || k === 18 /* Alt Key */
                || k === 93 /* Right Click Point Key */
                || ( k >= 35 && k <= 40 ) /* Home, End, Arrow Keys */
                || k === 45 /* Insert Key */
                || ( k >= 33 && k <= 34 ) /*Page Down, Page Up */
                || (k >= 112 && k <= 123) /* F1 - F12 */
                || (k >= 144 && k <= 145 )) { /* Num Lock, Scroll Lock */
            }
            // handle enter key
            else if (k === 13) {
                setInputValue(prevValue => prevValue + '\r\n');
            }
            else if (pattern.test(key)){
                setInputValue(inputValue => inputValue + key);
                setCursorPos(cursorPos => {
                    if (inputValue.length%2 == 0){
                       return cursorPos+1;
                    } 
                    else {
                        return cursorPos;
                    }
                });
                setWordArray( wordArray => {
                    wordArray[cursorPos] = key;
                    if (inputValue.length%2 == 1){
                        wordArray.push("*");
                        return wordArray.slice(1,MAX_LENGTH+1);
                    }
                    else {
                        return wordArray;
                    }
                });
            }
        }
        console.log("inputValue updated: " + inputValue);
        console.log("cursorPos updated: " + cursorPos);
        console.log("wordArray updated: " + wordArray);
        // listen for keydown events on the entire document
        document.addEventListener('keydown',handleKeyDown);

        // clean up
        return function cleanup () {
            document.removeEventListener('keydown', handleKeyDown);
        }
    }, [inputValue, wordArray, cursorPos]);

    return (
        <div>
            <h2>Type something on your keyboard:</h2>
            <p>You typed: {inputValue}</p>
            <div className="word-list">
                {wordArray.map((letter, index) => {
                    return (
                    <div className="word-item" key={index}>
                        {letter}
                    </div>
                    );
                })}
            </div>
        </div>
    );
}

export default KeyboardInput2;