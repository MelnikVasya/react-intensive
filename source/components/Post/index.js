// Core
import React, { Component } from "react";

// instruments
import avatar from "theme/assets/homer.png";
import moment from "moment";
import Styles from "./styles.m.css";

export default class Post extends Component {
    render () {
        return (
            <section className = { Styles.post }>
                <img src = { avatar } />
                <a>Vasya</a>
                <time>{moment().format("LLL")}</time>
                <p>Lorem ipsum dolor sit amet</p>
            </section>
        );
    }
}
