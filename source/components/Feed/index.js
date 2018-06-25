// Core
import React, { Component } from "react";

// Instruments
import Styles from "./styles.m.css";

// Components
import Composer from "components/Composer";
import Post from "components/Post";
import StatusBar from "components/StatusBar";

export default class Feed extends Component {
    render () {
        return (
            <section className = { Styles.feed }>
                <StatusBar />
                <Composer />
                <Post />
            </section>
        );
    }
}
