import React from "react";
import { useSelector } from 'react-redux';
import "./History.css";

export default function History() {
    const history = useSelector(state => state.calculator.history)

    const handleHistoryClose = () => {
        document.querySelector(".history-div").classList.remove("history-div--open");
        document.querySelector(".history-div").classList.add("history-div--closed");
    };

    return (
        <div className="history-div history-div--closed">
            <button onClick={handleHistoryClose} className="history-div__close-btn">&times;</button>
            <ul className="history-div__history-items">
                {history.map((history, i) => <li key={"history-div__history-result_" + i} className="history-div__history-result">{history}</li>)}
            </ul>
        </div>
    );
}