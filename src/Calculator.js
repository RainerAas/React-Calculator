import React, { useState } from "react";
import "./Calculator.css";

export default function Calculator(props) {
    const [displayValue, setDisplayValueStr] = useState("");
    const [lastPlacedNumber, setLastPlacedNumberStr] = useState("");
    const [isPlacedNumber, setPlacedNumberBool] = useState(false);
    const [isPlacedDot, setPlacedDotBool] = useState(false);
    const [isPlacedOperator, setPlacedOperatorBool] = useState(false);

    const handleNumberClick = ({ target }) => {
        const numberValue = target.value;

        setDisplayValueStr(prev => (prev + numberValue));
        setLastPlacedNumberStr(prev => (prev + numberValue))
        setPlacedNumberBool(true);
        setPlacedOperatorBool(false);
    };

    const handleOperation = ({ target }) => {
        const operatorValue = target.value;

        if (isPlacedNumber) {
            if (isPlacedOperator) {
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
            if (isPlacedNumber && !isPlacedOperator && !isPlacedDot) {
                setDisplayValueStr(prev => (prev + actionValue));
                setLastPlacedNumberStr(prev => (prev + actionValue));
                setPlacedDotBool(true);
                setPlacedNumberBool(false);
            }
        }

        if (actionValue === "+/-") {
            if (!isPlacedOperator) {
                let newDigit = lastPlacedNumber * -1;

                setDisplayValueStr(prev => (prev.slice(0, -lastPlacedNumber.length) + newDigit));
                setLastPlacedNumberStr(prev => (prev * -1).toString());

                if (!displayValue.includes(".")) {
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
            if (!isPlacedOperator && isPlacedNumber) {
                if (displayValue.startsWith("0")) {
                    setDisplayValueStr(prev => (prev.replace(/^0+/, "")));
                }

                let result = Function(`'use strict'; return (${displayValue})`)();
                setLastPlacedNumberStr(result);
                props.addToHistoryArray(displayValue, result);
                setDisplayValueStr(result.toString());
                setPlacedNumberBool(true);

                if (result.toString().includes(".")) {
                    setPlacedDotBool(true);
                }
            }
        }
    }

    return (
        <div className="calculator calculator--fade-in">
            <h1 className="calculator__name"><b>HW 01</b></h1>
            <input className="calculator__screen" type="text"  disabled value={displayValue} placeholder="0" />
            <div className="calculator__keys">
                <button onClick={handleOperation} className="btn btn-secondary" type="button" value="+">+</button>
                <button onClick={handleOperation} className="btn btn-secondary" type="button" value="-">-</button>
                <button onClick={handleOperation} className="btn btn-secondary" type="button" value="*">&times;</button>
                <button onClick={handleOperation} className="btn btn-secondary" type="button" value="/">&divide;</button>

                <button onClick={handleNumberClick} className="btn calculator__number-button" type="button" value="7">7</button>
                <button onClick={handleNumberClick} className="btn calculator__number-button" type="button" value="8">8</button>
                <button onClick={handleNumberClick} className="btn calculator__number-button" type="button" value="9">9</button>
                <button onClick={handleNumberClick} className="btn calculator__number-button" type="button" value="4">4</button>
                <button onClick={handleNumberClick} className="btn calculator__number-button" type="button" value="5">5</button>
                <button onClick={handleNumberClick} className="btn calculator__number-button" type="button" value="6">6</button>
                <button onClick={handleNumberClick} className="btn calculator__number-button" type="button" value="1">1</button>
                <button onClick={handleNumberClick} className="btn calculator__number-button" type="button" value="2">2</button>
                <button onClick={handleNumberClick} className="btn calculator__number-button" type="button" value="3">3</button>
                <button onClick={handleNumberClick} className="btn calculator__number-button" type="button" value="0">0</button>

                <button onClick={handleAction} className="btn btn-secondary" type="button" value=".">.</button>
                <button onClick={handleAction} className="btn btn-secondary" type="button" value="+/-">+/-</button>
                <button onClick={handleAction} className="btn btn-danger" type="button" value="clear">C</button>
                <button onClick={handleAction} className="btn btn-primary calculator__equal-sign" type="button" value="=">=</button>
            </div>
        </div>
    );
}