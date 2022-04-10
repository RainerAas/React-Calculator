import { HANDLE_ADD_CALCUALTOR, HANDLE_REMOVE_CALCULATOR } from '../../actions/calculators/calculators.actions';
import Calculator from "../../../Calculator.js";

const initialState = {
    calculators: [<Calculator key={0} calculatorNo={0}/>]
};

const CalculatorsReducer = (state = initialState, action) => {
    switch (action.type) {
        case HANDLE_ADD_CALCUALTOR: {
            const calculator = <Calculator key={state.calculators.length} calculatorNo={state.calculators.length}/>
            return {
                ...state,
                calculators: [...state.calculators, calculator]
            }
        }
        case HANDLE_REMOVE_CALCULATOR: {
            const remainingCalculators = state.calculators.filter(item => parseInt(item.key) !== state.calculators.length - 1);
            return {
                ...state,
                calculators: remainingCalculators
            }
        }
        default:
            return state;
    }
};

export default CalculatorsReducer;