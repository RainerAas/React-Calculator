import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { handleNumber, handleAction, handleOperation } from "../../store/actions/calculator/calculatorActions";
import "./Calculator.css";

export default function Calculator(props) {

    const dispatch = useDispatch();
    const calculatorNo = props.calculatorNo;
    const displayValue = useSelector(state => state.calculator.states[calculatorNo].displayValue);
    const calcName = "CALC"

    return (
        <div className="calculator calculator--fade-in">
            <h1 className="calculator__name">{calcName}</h1>
            <input className="calculator__screen" type="text" disabled value={displayValue} placeholder="0" />
            <div className="calculator__numpad">
                <button onClick={() => dispatch(handleOperation("+", calculatorNo))} className="calculator__btn calculator__action-btn" type="button" value="+">+</button>
                <button onClick={() => dispatch(handleOperation("-", calculatorNo))} className="calculator__btn calculator__action-btn" type="button" value="-">-</button>
                <button onClick={() => dispatch(handleOperation("*", calculatorNo))} className="calculator__btn calculator__action-btn" type="button" value="*">&times;</button>
                <button onClick={() => dispatch(handleOperation("/", calculatorNo))} className="calculator__btn calculator__action-btn" type="button" value="/">&divide;</button>

                <button onClick={() => dispatch(handleNumber(7, calculatorNo))} className="calculator__btn calculator__number-btn" type="button" value="7">7</button>
                <button onClick={() => dispatch(handleNumber(8, calculatorNo))} className="calculator__btn calculator__number-btn" type="button" value="8">8</button>
                <button onClick={() => dispatch(handleNumber(9, calculatorNo))} className="calculator__btn calculator__number-btn" type="button" value="9">9</button>
                <button onClick={() => dispatch(handleNumber(4, calculatorNo))} className="calculator__btn calculator__number-btn" type="button" value="4">4</button>
                <button onClick={() => dispatch(handleNumber(5, calculatorNo))} className="calculator__btn calculator__number-btn" type="button" value="5">5</button>
                <button onClick={() => dispatch(handleNumber(6, calculatorNo))} className="calculator__btn calculator__number-btn" type="button" value="6">6</button>
                <button onClick={() => dispatch(handleNumber(1, calculatorNo))} className="calculator__btn calculator__number-btn" type="button" value="1">1</button>
                <button onClick={() => dispatch(handleNumber(2, calculatorNo))} className="calculator__btn calculator__number-btn" type="button" value="2">2</button>
                <button onClick={() => dispatch(handleNumber(3, calculatorNo))} className="calculator__btn calculator__number-btn" type="button" value="3">3</button>
                <button onClick={() => dispatch(handleNumber(0, calculatorNo))} className="calculator__btn calculator__number-btn" type="button" value="0">0</button>

                <button onClick={() => dispatch(handleAction(".", calculatorNo))} className="calculator__btn calculator__action-btn" type="button" value=".">.</button>
                <button onClick={() => dispatch(handleAction("+/-", calculatorNo))} className="calculator__btn calculator__action-btn" type="button" value="+/-">+/-</button>
                <button onClick={() => dispatch(handleAction("clear", calculatorNo))} className="calculator__btn calculator__clear-btn" type="button" value="clear">C</button>
                <button onClick={() => dispatch(handleAction("=", calculatorNo))} className="calculator__btn calculator__equal-btn" type="button" value="=">=</button>
            </div>
        </div>
    );
}