// Core
import React, { Component } from "react";
import { string } from "prop-types";

// Instruments
import Styles from "./styles.m.css";

// Components
import Composer from "components/Composer";
import Post from "components/Post";

export default class Feed extends Component {
    static propTypes = {
        avatar:               string.isRequired,
        currentUserFirstName: string.isRequired,
        currentUserLastName:  string.isRequired,
    };

    static defaultProps = {
        currentUserFirstName: "Jon",
    };

    render () {
        const { avatar, currentUserFirstName } = this.props;

        return (
            <section className = { Styles.feed }>
                <Composer
                    avatar = { avatar }
                    currentUserFirstName = { currentUserFirstName }
                />
                <Post { ...this.props } />
            </section>
        );
    }
}
