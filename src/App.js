import React, { useState } from "react";
import Calculator from "./Calculator.js";
import "./App.css";

export default function App() {
    const [historyArray, setHistoryArray] = useState([]);

    const addToHistoryArray = (equation, result) => {
        const equationWithResult = `${equation} = ${result}`;
        setHistoryArray(prev => [...prev, equationWithResult]);
    };

    const handleHistoryOpen = () => document.querySelector("#history-side").style.width = "250px";
    const handleHistoryClose = () => document.querySelector("#history-side").style.width = "0px";

    return (
        <div>
            <nav className="navbar navbar-expand py-2">
                <span className="open-btn" onClick={handleHistoryOpen}>&#9776; History</span>
            </nav>

            <div id="history-side" className="side-div">
                <button className="close-btn" onClick={handleHistoryClose}>&times;</button>
                <ul className="history-items">
                    {historyArray.map((history, i) =>
                        <li key={"history-result_" + i} className="history-result">{history}</li>
                    )}
                </ul>
            </div>

            <div id="content">
                <Calculator addToHistoryArray={addToHistoryArray} />
            </div>
        </div>
    );
}