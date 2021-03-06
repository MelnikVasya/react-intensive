// Core
import React, { Component } from "react";

// Instrument
import Styles from "./styles.m.css";
import { object } from "prop-types";

export default class Catcher extends Component {
    static propTypes = {
        children: object.isRequired,
    };

    state = {
        error: false,
    };

    componentDidCatch () {
        this.setState({ error: true });
    }

    render () {
        const { error } = this.state;
        const { children } = this.props;

        if (error) {
            return (
                <section className = { Styles.catcher }>
                    <span>A mysterious 👽 &nbsp;error 📛 &nbsp;occured.</span>
                    <p>
                        Our space 🛰 &nbsp;engineers strike team 👩🏼‍🚀 👨🏼‍🚀 &nbsp;is
                        already working 🚀 &nbsp;in order to fix that for you!
                    </p>
                </section>
            );
        }

        return children;
    }
}
