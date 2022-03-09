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
        document.querySelector("#history-side").classList.remove("side-div-closed");
        document.querySelector("#history-side").classList.add("side-div-open");
    };

    const handleHistoryClose = () => {
        document.querySelector("#history-side").classList.remove("side-div-open");
        document.querySelector("#history-side").classList.add("side-div-closed");
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
            <nav className="navbar navbar-expand py-2">
                <button type="button" className="btn btn-dark fade-in" onClick={handleAddCalculator}>Add Calculator</button>
                <button type="button" className="btn btn-dark fade-in" onClick={handleRemoveCalculator}>Remove Calculator</button>
                <span className="open-btn fade-in" onClick={handleHistoryOpen}>&#9776; History</span>
            </nav>

            <div id="history-side" className="side-div side-div-closed">
                <button className="close-btn" onClick={handleHistoryClose}>&times;</button>
                <ul className="history-items">
                    {history.map((history, i) =>
                        <li key={"history-result_" + i} className="history-result">{history}</li>
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