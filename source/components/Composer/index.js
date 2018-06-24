// Core
import React, { Component } from "react";

// instruments
import avatar from "theme/assets/homer.png";
import Styles from "./styles.m.css";

export default class Composer extends Component {
    render () {
        return (
            <section className = { Styles.composer }>
                <img src = { avatar } />
                <form>
                    <textarea placeholder = 'What is in you mind' />
                    <input type = 'submit' valuse = 'Post' />
                </form>
            </section>
        );
    }
}
