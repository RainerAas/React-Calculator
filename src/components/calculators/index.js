import React from "react";
import { useSelector } from 'react-redux';
import "./Calculators.css";

export default function Calculators() {
    const calculators = useSelector(state => state.calculators.calculators);

    return (
        <div class="calculators__container">
            {calculators.map((calculator, i) => <div key={i}>{calculator}</div>)}
        </div>
    );
}