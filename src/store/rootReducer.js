import { combineReducers } from "redux";
import calculatorReducer from './reducers/calculator/calculatorReducer';
import calculatorsReducer from './reducers/calculators/calculatorsReducer';

const rootReducer = combineReducers({
    calculator: calculatorReducer,
    calculators: calculatorsReducer
});

export default rootReducer;