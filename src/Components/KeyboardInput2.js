import React, { useEffect, useState } from 'react';

function KeyboardInput2 () {
    const[inputValue, setInputValue] = useState("");

    useEffect ( () => {
        function handleKeyDown(event) {
            console.log(event.key);
            const {key} = event;
            setInputValue(prevValue=>prevValue + key);
        }
        
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