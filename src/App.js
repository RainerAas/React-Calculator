import React, { useState } from "react";
import Calculator from "./Calculator.js";
import "./App.css";

export default function App() {
    const [history, setHistory] = useState([]);
    const [calculators, setCalculators] = useState([]);

    const addToHistoryArray = (equation, result) => {
        const equationWithResult = `${equation} = ${result}`;
        setHistory(prev => [...prev, equationWithResult]);
    };

    const handleHistoryOpen = () => {
        document.querySelector(".history-div").classList.remove("history-div--closed");
        document.querySelector(".history-div").classList.add("history-div--open");
    };

    const handleHistoryClose = () => {
        document.querySelector(".history-div").classList.remove("history-div--open");
        document.querySelector(".history-div").classList.add("history-div--closed");
    };

    const handleAddCalculator = () => {
        const calculator = <Calculator key={calculators.length} addToHistoryArray={addToHistoryArray} />
        setCalculators(prev => [...prev, calculator]);
    }

    const handleRemoveCalculator = () => {
        if (calculators.length > 0) {
            const remainingCalculators = calculators.filter(item => parseInt(item.key) !== calculators.length - 1);
            setCalculators(remainingCalculators);
        }
    }

    return (
        <div>
            <nav className="navbar">
                <div className="navbar__dynamic-btns">
                    <button className="navbar__btn navbar__add-calc-btn" type="button" onClick={handleAddCalculator}>Add Calculator</button>
                    <button className="navbar__btn " type="button" onClick={handleRemoveCalculator}>Remove Calculator</button>
                </div>
                <button className="navbar__btn navbar__open-history-btn" type="button" onClick={handleHistoryOpen}>&#9776; History</button>
            </nav>

            <div className="history-div history-div--closed">
                <button className="history-div__close-btn" onClick={handleHistoryClose}>&times;</button>
                <ul className="history-div__history-items">
                    {history.map((history, i) =>
                        <li key={"history-div__history-result_" + i} className="history-div__history-result">{history}</li>
                    )}
                </ul>
            </div>

            <div id="content">
                {calculators.map((calculator, i) =>
                    <div key={i}>{calculator}</div>
                )}
            </div>
        </div>
    );
}