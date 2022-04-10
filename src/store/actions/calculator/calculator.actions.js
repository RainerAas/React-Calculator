export const HANDLE_NUMBER = "HANDLE_NUMBER";
export const HANDLE_OPERATION = "HANDLE_OPERATION";
export const HANDLE_ACTION = "HANDLE_ACTION";
export const ADD_NEW_CALCULATOR_STATE = "ADD_NEW_CALCULATOR_STATE";
export const REMOVE_CALCULATOR_STATE = "REMOVE_CALCULATOR_STATE";

export const handleNumber = (value, calculatorNo) => ({
    type: HANDLE_NUMBER,
    payload: {value, calculatorNo}
});

export const handleOperation = (value, calculatorNo) => ({
    type: HANDLE_OPERATION,
    payload: {value, calculatorNo}
});

export const handleAction = (value, calculatorNo) => ({
    type: HANDLE_ACTION,
    payload: {value, calculatorNo}
});

export const addNewCalculatorState = () => ({
    type: ADD_NEW_CALCULATOR_STATE
});

export const removeCalculatorState = () => ({
    type: REMOVE_CALCULATOR_STATE
});
