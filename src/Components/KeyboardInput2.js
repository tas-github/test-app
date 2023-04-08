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
            setInputValue(prevValue=>prevValue + key);
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