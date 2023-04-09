// import React component, and the useEffect and useState hooks
import React, { useEffect, useState } from 'react';

/*  this function component places an event listener on the entire web
    document that listens for keydown events, and handles these events
**/ 
function KeyboardInput2 () {

    // set a state variable and it's value setter function with the useState hook
    // set the initial value of the state variable to ""
    const[inputValue, setInputValue] = useState("");

    // the useEffect hook is a lifecycle hook that handles actions when the
    // component is mounted - (is rendered)
    // this useEffect hook is telling this component to handle a keydown event
    useEffect ( () => {
        // how to handle the keydown event
        function handleKeyDown(event) {
            console.log(event.key);
            const {key} = event;
            const k = event.which;
            console.log("k: "+k);
            var pattern = /[A-Za-z]/;
            // Verify that the key entered is not a special key
            if (k == 20 /* Caps lock */
                || k == 16 /* Shift */
                || k == 8 /* Backspace */
                || k == 46 /* Delete */
                || k == 9 /* Tab */
                || k == 27 /* Escape Key */
                || k == 17 /* Control Key */
                || k == 91 /* Windows Command Key */
                || k == 19 /* Pause Break */
                || k == 18 /* Alt Key */
                || k == 93 /* Right Click Point Key */
                || ( k >= 35 && k <= 40 ) /* Home, End, Arrow Keys */
                || k == 45 /* Insert Key */
                || ( k >= 33 && k <= 34 ) /*Page Down, Page Up */
                || (k >= 112 && k <= 123) /* F1 - F12 */
                || (k >= 144 && k <= 145 )) { /* Num Lock, Scroll Lock */
            }
            else if (pattern.test(key)){
                setInputValue(prevValue=>prevValue + key);
            }
        }
        // listen for keydown events on the entire document
        document.addEventListener('keydown',handleKeyDown);

        // clean up
        return function cleanup () {
            document.removeEventListener('keydown', handleKeyDown);
        }
    }, []);

    return (
        <div>
            <h2>Type something on your keyboard:</h2>
            <p>You typed: {inputValue}</p>
        </div>
    );
}

export default KeyboardInput2;