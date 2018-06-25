// Core
import React from "react";
import { number } from "prop-types";

// Instruments
import Styles from "./styles.m.css";

const Counter = ({ postCount }) => (
    <section className = { Styles.counter }>{`Posts count: ${postCount}`}</section>
);

Counter.propType = {
    postCount: number,
};

Counter.defaultProps = {
    postCount: 0,
};

export default Counter;
