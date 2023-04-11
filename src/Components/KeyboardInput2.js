// import React component, and the useEffect and useState hooks
import React, { useEffect, useState } from 'react';

/*  this function component places an event listener on the entire web
    document that listens for keydown events, and handles these events
**/ 
function KeyboardInput2 () {

    // set a state variable and it's value setter function with the useState hook
    // set the initial value of the state variable to ""
    const[inputValue, setInputValue] = useState("");
    const[wordArray, setWordArray] = useState([]);

    // the useEffect hook is a lifecycle hook that handles actions when the
    // component is mounted - (is rendered)
    // this useEffect hook is telling this component to handle a keydown event
    useEffect ( () => {
        // how to handle the keydown event
        function handleKeyDown(event) {
            // get current inputValue
            const {key} = event;
            const k = event.which;
            /*
            console.log(event.key);
            console.log("k: "+k);
            */
            var pattern = /[A-Za-z]/;
            // handle backspace key
            if (k === 8){
                setInputValue(prevValue => prevValue.slice(0, -1));
                setWordArray(wArray => wArray.slice(0, -1));
            }
            else if (inputValue.length >= 6){
                console.log("Max length reached: "+inputValue.length);
                console.log("inputValue: " + inputValue);
                console.log("inputValue.length: " + inputValue.length);
                
                console.log("wordArray: " + wordArray);
                console.log("wordArray.length: " + wordArray.length);
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
                setInputValue(prevValue => prevValue + key);
                setWordArray(wArray => wArray.concat(key));
            }
            console.log("inputValue: " + inputValue);
            console.log("inputValue length: " + inputValue.length);
            
            console.log("wordArray:" + wordArray);
            console.log("wordArray.length:" + wordArray.length);

        }
        
        // listen for keydown events on the entire document
        document.addEventListener('keydown',handleKeyDown);

        // clean up
        return function cleanup () {
            document.removeEventListener('keydown', handleKeyDown);
        }
    }, [inputValue, wordArray]);

    return (
        <div>
            <h2>Type something on your keyboard:</h2>
            <p>You typed: {inputValue}</p>
        </div>
    );
}

export default KeyboardInput2;