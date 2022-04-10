import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { handleAddCalculator, handleRemoveCalculator } from "./store/actions/calculators/calculators.actions";
import { addNewCalculatorState, removeCalculatorState } from "./store/actions/calculator/calculator.actions";
import "./App.css";

export default function App() {

    const dispatch = useDispatch();
    const calculators = useSelector(state => state.calculators.calculators);
    const history = useSelector(state => state.calculator.history)

    const handleHistoryOpen = () => {
        document.querySelector(".history-div").classList.remove("history-div--closed");
        document.querySelector(".history-div").classList.add("history-div--open");
    };

    const handleHistoryClose = () => {
        document.querySelector(".history-div").classList.remove("history-div--open");
        document.querySelector(".history-div").classList.add("history-div--closed");
    };

    return (
        <div>
            <nav className="navbar">
                <div className="navbar__dynamic-btns">
                    
                    <button onClick={() => {
                        dispatch(handleAddCalculator());
                        dispatch(addNewCalculatorState());
                    }} className="navbar__btn navbar__add-calc-btn" type="button">Add Calculator</button>

                    <button onClick={() => {
                        dispatch(handleRemoveCalculator());
                        dispatch(removeCalculatorState());
                    }} className="navbar__btn " type="button">Remove Calculator</button>
                </div>
                <button onClick={handleHistoryOpen} className="navbar__btn navbar__open-history-btn" type="button">&#9776; History</button>
            </nav>


            <div className="history-div history-div--closed">
                <button onClick={handleHistoryClose} className="history-div__close-btn">&times;</button>
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
