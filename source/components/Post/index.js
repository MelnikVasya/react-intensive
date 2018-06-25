// Core
import React, { Component } from "react";
import { string, func, number } from "prop-types";

// Instruments
import Styles from "./styles.m.css";
import moment from "moment";

// Components
import { withProfile } from "hoc/withProfile";

export class Post extends Component {
    static propTypes = {
        avatar:      string.isRequired,
        comment:     string.isRequired,
        created:     number.isRequired,
        destroyPost: func.isRequired,
        firstName:   string.isRequired,
        id:          string.isRequired,
        lastName:    string.isRequired,
    };

    _handleDestroyPost = () => {
        this.props.destroyPost(this.props.id);
    };

    render () {
        const { comment, avatar, firstName, lastName, created } = this.props;

        return (
            <section className = { Styles.post }>
                <span
                    className = { Styles.cross }
                    onClick = { this._handleDestroyPost }
                />
                <img src = { avatar } />
                <a>{`${firstName} ${lastName}`}</a>
                <time>{moment(created).format("MMMM Do YYYY, h:mm:ss a")}</time>
                <p>{comment}</p>
            </section>
        );
    }
}

export default withProfile(Post);
