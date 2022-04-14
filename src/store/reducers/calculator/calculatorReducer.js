import { HANDLE_NUMBER, HANDLE_OPERATION, HANDLE_ACTION, ADD_NEW_CALCULATOR_STATE, REMOVE_CALCULATOR_STATE } from '../../actions/calculator/calculatorActions';

const initialState = {
    history: [],
    states: [
        {
            displayValue: "",
            lastPlacedNumber: "",
            isPlacedNumber: false,
            isPlacedDot: false,
            isPlacedOperator: false
        }
    ]
};

const CalculatorReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_NEW_CALCULATOR_STATE: {
            const newCalculatorState = {
                displayValue: "",
                lastPlacedNumber: "",
                isPlacedNumber: false,
                isPlacedDot: false,
                isPlacedOperator: false
            }
            return {
                ...state,
                states: [...state.states, newCalculatorState]
            }
        }

        case REMOVE_CALCULATOR_STATE: {
            return {
                ...state,
                states: state.states.slice(0, -1)
            }
        }

        case HANDLE_NUMBER: {
            const newArray = [...state.states];
            const calculatorNo = action.payload.calculatorNo;
            newArray[calculatorNo] = {
                displayValue: state.states[calculatorNo].displayValue + action.payload.value,
                lastPlacedNumber: state.states[calculatorNo].lastPlacedNumber + action.payload.value,
                isPlacedNumber: true,
                isPlacedDot: state.states[calculatorNo].isPlacedDot,
                isPlacedOperator: false
            }
            return {
                ...state,
                states: newArray
            }
        }

        case HANDLE_OPERATION: {
            const calculatorNo = action.payload.calculatorNo;
            if (state.states[calculatorNo].isPlacedNumber) {
                if (state.states[calculatorNo].isPlacedOperator) {
                    const newArray = [...state.states];
                    newArray[calculatorNo] = {
                        displayValue: state.states[calculatorNo].displayValue.slice(0, -3) + ` ${action.payload.value} `,
                        lastPlacedNumber: state.states[calculatorNo].lastPlacedNumber,
                        isPlacedNumber: true,
                        isPlacedDot: false,
                        isPlacedOperator: true
                    }
                    return {
                        ...state,
                        states: newArray
                    }
                } else {
                    const newArray = [...state.states];
                    newArray[calculatorNo] = {
                        displayValue: state.states[calculatorNo].displayValue + ` ${action.payload.value} `,
                        lastPlacedNumber: "",
                        isPlacedNumber: true,
                        isPlacedDot: false,
                        isPlacedOperator: true
                    }
                    return {
                        ...state,
                        states: newArray
                    }
                }
            } else {
                return {
                    ...state
                }
            }
        }

        case HANDLE_ACTION: {
            let actionValue = action.payload.value;
            const calculatorNo = action.payload.calculatorNo;
            if (actionValue === ".") {
                if (state.states[calculatorNo].isPlacedNumber && !state.states[calculatorNo].isPlacedOperator && !state.states[calculatorNo].isPlacedDot) {
                    const newArray = [...state.states];
                    newArray[calculatorNo] = {
                        displayValue: state.states[calculatorNo].displayValue + actionValue,
                        lastPlacedNumber: state.states[calculatorNo].lastPlacedNumber + actionValue,
                        isPlacedNumber: false,
                        isPlacedDot: true,
                        isPlacedOperator: state.states[calculatorNo].isPlacedOperator
                    }
                    return {
                        ...state,
                        states: newArray
                    }
                }
            }
            if (actionValue === "+/-") {
                if (!state.states[calculatorNo].isPlacedOperator) {
                    let newDigit = state.states[calculatorNo].lastPlacedNumber * -1;
                    if (!state.states[calculatorNo].displayValue.includes(".")) {
                        const newArray = [...state.states];
                        newArray[calculatorNo] = {
                            displayValue: state.states[calculatorNo].displayValue.slice(0, -state.states[calculatorNo].lastPlacedNumber.length) + newDigit,
                            lastPlacedNumber: (state.states[calculatorNo].lastPlacedNumber * -1).toString(),
                            isPlacedNumber: state.states[calculatorNo].isPlacedNumber,
                            isPlacedDot: false,
                            isPlacedOperator: state.states[calculatorNo].isPlacedOperator
                        }
                        return {
                            ...state,
                            states: newArray
                        }
                    } else {
                        if (state.states[calculatorNo].displayValue.charAt(state.states[calculatorNo].displayValue.length - 1) === ".") {
                            const newArray = [...state.states];
                            newArray[calculatorNo] = {
                                displayValue: state.states[calculatorNo].displayValue.slice(0, -state.states[calculatorNo].lastPlacedNumber.length) + newDigit,
                                lastPlacedNumber: (state.states[calculatorNo].lastPlacedNumber * -1).toString(),
                                isPlacedNumber: true,
                                isPlacedDot: false,
                                isPlacedOperator: state.states[calculatorNo].isPlacedOperator
                            }
                            return {
                                ...state,
                                states: newArray
                            }
                        } else {
                            const newArray = [...state.states];
                            newArray[calculatorNo] = {
                                displayValue: state.states[calculatorNo].displayValue.slice(0, -state.states[calculatorNo].lastPlacedNumber.length) + newDigit,
                                lastPlacedNumber: (state.states[calculatorNo].lastPlacedNumber * -1).toString(),
                                isPlacedNumber: state.states[calculatorNo].isPlacedNumber,
                                isPlacedDot: true,
                                isPlacedOperator: state.states[calculatorNo].isPlacedOperator
                            }
                            return {
                                ...state,
                                states: newArray
                            }
                        }
                    }
                }
            }
            if (actionValue === "clear") {
                const newArray = [...state.states];
                newArray[calculatorNo] = {
                    displayValue: "",
                    lastPlacedNumber: "",
                    isPlacedNumber: false,
                    isPlacedOperator: false,
                    isPlacedDot: false
                }
                return {
                    ...state,
                    states: newArray
                }
            }
            if (actionValue === "=") {
                if (!state.states[calculatorNo].isPlacedOperator && state.states[calculatorNo].isPlacedNumber) {
                    let displayValue = state.states[calculatorNo].displayValue;
                    if (displayValue.startsWith("0")) {
                        displayValue = displayValue.replace(/^0+/, "");
                    }

                    let result = Function(`'use strict'; return (${displayValue})`)();
                    let historyResult = `${displayValue} = ${result}`;

                    if (!result.toString().includes(".")) {
                        const newArray = [...state.states];
                        newArray[calculatorNo] = {
                            lastPlacedNumber: result,
                            displayValue: result.toString(),
                            isPlacedNumber: true,
                            isPlacedDot: state.states[calculatorNo].isPlacedDot,
                            isPlacedOperator: state.states[calculatorNo].isPlacedOperator
                        }
                        return {
                            ...state,
                            history: [...state.history, historyResult],
                            states: newArray
                        }
                    } else {
                        const newArray = [...state.states];
                        newArray[calculatorNo] = {
                            lastPlacedNumber: result,
                            displayValue: result.toString(),
                            isPlacedNumber: true,
                            isPlacedDot: true,
                            isPlacedOperator: state.states[calculatorNo].isPlacedOperator
                        }
                        return {
                            ...state,
                            history: [...state.history, historyResult],
                            states: newArray
                        }
                    }
                }
            } else {
                return {
                    ...state
                }
            }
        }

        default:
            return state;
    }
};

export default CalculatorReducer;
