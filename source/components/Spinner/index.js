// Core
import React, { Component } from "react";
import { createPortal } from "react-dom";

// Instruments
import Styles from "./styles.m.css";

const portalContainer = document.getElementById("spinner");

export default class Spinner extends Component {
    render () {
        const { isSpining } = this.props;

        return createPortal(
            isSpining ? <div className = { Styles.spinner } /> : null,
            portalContainer
        );
    }
}
