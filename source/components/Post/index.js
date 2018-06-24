// Core
import React, { Component } from "react";
import { string } from "prop-types";

// instruments
import moment from "moment";
import Styles from "./styles.m.css";

export default class Post extends Component {
    static propTypes = {
        avatar:               string.isRequired,
        currentUserFirstName: string.isRequired,
        currentUserLastName:  string.isRequired,
    };

    render () {
        const {
            avatar,
            currentUserFirstName,
            currentUserLastName,
        } = this.props;

        return (
            <section className = { Styles.post }>
                <img src = { avatar } />
                <a>{`${currentUserFirstName} ${currentUserLastName}`}</a>
                <time>{moment().format("LLL")}</time>
                <p>Lorem ipsum dolor sit amet</p>
            </section>
        );
    }
}
