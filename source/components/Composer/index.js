// Core
import React, { Component } from "react";
import { string } from "prop-types";

// instruments
import Styles from "./styles.m.css";

export default class Composer extends Component {
    static propTypes = {
        avatar:               string.isRequired,
        currentUserFirstName: string.isRequired,
    };

    render () {
        const { avatar, currentUserFirstName } = this.props;

        return (
            <section className = { Styles.composer }>
                <img src = { avatar } />
                <form>
                    <textarea
                        placeholder = { `What is in you mind ${currentUserFirstName}` }
                    />
                    <input type = 'submit' valuse = 'Post' />
                </form>
            </section>
        );
    }
}
