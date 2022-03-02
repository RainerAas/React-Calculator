import React, { useState } from "react";
import "./Calculator.css";

export default function Calculator(props) {
    const [displayValueStr, setDisplayValueStr] = useState("");
    const [lastPlacedNumberStr, setLastPlacedNumberStr] = useState("");
    const [placedNumberBool, setPlacedNumberBool] = useState(false);
    const [placedDotBool, setPlacedDotBool] = useState(false);
    const [placedOperatorBool, setPlacedOperatorBool] = useState(false);

    const handleNumberClick = ({ target }) => {
        const numberValue = target.value;

        setDisplayValueStr(prev => (prev + numberValue));
        setLastPlacedNumberStr(prev => (prev + numberValue))
        setPlacedNumberBool(true);
        setPlacedOperatorBool(false);
    };

    const handleOperation = ({ target }) => {
        const operatorValue = target.value;

        if (placedNumberBool) {
            if (placedOperatorBool) {
                setDisplayValueStr(prev => (prev.slice(0, -3) + ` ${operatorValue} `));
                setPlacedDotBool(false);
            } else {
                setDisplayValueStr(prev => (prev + ` ${operatorValue} `));
                setPlacedOperatorBool(true);
                setPlacedDotBool(false);
            }

            setLastPlacedNumberStr("");
        }
    };

    const handleAction = ({ target }) => {
        const actionValue = target.value;

        if (actionValue === ".") {
            if (placedNumberBool && !placedOperatorBool && !placedDotBool) {
                setDisplayValueStr(prev => (prev + actionValue));
                setLastPlacedNumberStr(prev => (prev + actionValue));
                setPlacedDotBool(true);
                setPlacedNumberBool(false);
            }
        }

        if (actionValue === "+/-") {
            if (!placedOperatorBool) {
                let newDigit = lastPlacedNumberStr * -1;

                setDisplayValueStr(prev => (prev.slice(0, -lastPlacedNumberStr.length) + newDigit));
                setLastPlacedNumberStr(prev => (prev * -1).toString());

                if (!displayValueStr.includes(".")) {
                    setPlacedDotBool(false);
                }
            }
        }

        if (actionValue === "clear") {
            setDisplayValueStr("");
            setLastPlacedNumberStr("");
            setPlacedNumberBool(false);
            setPlacedDotBool(false);
            setPlacedOperatorBool(false);
        }

        if (actionValue === "=") {
            if (!placedOperatorBool && placedNumberBool) {
                if (displayValueStr.startsWith("0")) {
                    setDisplayValueStr(prev => (prev.replace(/^0+/, "")));
                }

                let result = Function(`'use strict'; return (${displayValueStr})`)();
                setLastPlacedNumberStr(result);
                props.addToHistoryArray(displayValueStr, result);
                setDisplayValueStr(result.toString());
                setPlacedNumberBool(true);

                if (result.toString().includes(".")) {
                    setPlacedDotBool(true);
                }
            }
        }
    }

    return (
        <div className="fade-in calculator">
            <h1 className="calculator-name"><b>HW 01</b></h1>
            <input id="calculator-display" type="text" className="calculator-screen z-depth-1" value={displayValueStr} disabled placeholder="0" />
            <div className="calculator-keys">
                <button onClick={handleOperation} type="button" className="btn btn-secondary" value="+">+</button>
                <button onClick={handleOperation} type="button" className="btn btn-secondary" value="-">-</button>
                <button onClick={handleOperation} type="button" className="btn btn-secondary" value="*">&times;</button>
                <button onClick={handleOperation} type="button" className="btn btn-secondary" value="/">&divide;</button>

                <button onClick={handleNumberClick} type="button" className="btn number-button" value="7">7</button>
                <button onClick={handleNumberClick} type="button" className="btn number-button" value="8">8</button>
                <button onClick={handleNumberClick} type="button" className="btn number-button" value="9">9</button>
                <button onClick={handleNumberClick} type="button" className="btn number-button" value="4">4</button>
                <button onClick={handleNumberClick} type="button" className="btn number-button" value="5">5</button>
                <button onClick={handleNumberClick} type="button" className="btn number-button" value="6">6</button>
                <button onClick={handleNumberClick} type="button" className="btn number-button" value="1">1</button>
                <button onClick={handleNumberClick} type="button" className="btn number-button" value="2">2</button>
                <button onClick={handleNumberClick} type="button" className="btn number-button" value="3">3</button>
                <button onClick={handleNumberClick} type="button" className="btn number-button" value="0">0</button>

                <button onClick={handleAction} type="button" className="btn btn-secondary" value=".">.</button>
                <button onClick={handleAction} type="button" className="btn btn-secondary" value="+/-">+/-</button>
                <button onClick={handleAction} type="button" className="btn btn-danger btn-sm" value="clear" >C</button>
                <button onClick={handleAction} type="button" className="equal-sign-button btn btn-primary" value="=">=</button>
            </div>
        </div>
    );
}