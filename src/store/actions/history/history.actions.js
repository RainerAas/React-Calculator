export const ADD_TO_HISTORY = "ADD_TO_HISTORY";

export const addToHistory = (equation, result) => ({
    type: ADD_TO_HISTORY,
    payload: `${equation} = ${result}`
});