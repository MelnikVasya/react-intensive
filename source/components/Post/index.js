// Core
import React, { Component } from "react";

// Instruments
import moment from "moment";
import Styles from "./styles.m.css";

// Components
import { Consumer } from "hoc/withProfile";

export default class Post extends Component {
    render () {
        return (
            <Consumer>
                {({ avatar, currentUserFirstName, currentUserLastName }) => (
                    <section className = { Styles.post }>
                        <span className = { Styles.cross } />
                        <img src = { avatar } />
                        <a>{`${currentUserFirstName} ${currentUserLastName}`}</a>
                        <time>{moment().format("LLL")}</time>
                        <p>{this.props.comment}</p>
                    </section>
                )}
            </Consumer>
        );
    }
}
