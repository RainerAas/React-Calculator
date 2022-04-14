import React from "react";
import Navbar from "../components/navbar";
import History from "../components/history";
import Calculators from "../components/calculators";

export default function App() {
    return (
        <div>
            <Navbar />

            <History />

            <Calculators />
        </div>
    );
}