import React from "react";
import { useDispatch } from 'react-redux';
import { handleAddCalculator, handleRemoveCalculator } from "../../store/actions/calculators/calculatorsActions";
import { addNewCalculatorState, removeCalculatorState } from "../../store/actions/calculator/calculatorActions";
import "./Navbar.css";

export default function Navbar() {
    const dispatch = useDispatch();

    const handleHistoryOpen = () => {
        document.querySelector(".history-div").classList.remove("history-div--closed");
        document.querySelector(".history-div").classList.add("history-div--open");
    };

    return (
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
    );
}