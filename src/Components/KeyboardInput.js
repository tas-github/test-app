import React, {useState} from "react";

function KeyboardInput(){
    const[inputValue, setInputValue] = useState("");

    function handleKeyDown(event) {
        const {key} = event;
        setInputValue(prevValue=>prevValue + key);
    }

    return (
        <div>
            <h2>Type something on your keyboard:</h2>
            <input type="text" value={inputValue} onKeyDown={handleKeyDown} />
            <p>You typed: {inputValue}</p>
        </div>
    );
}

export default KeyboardInput;