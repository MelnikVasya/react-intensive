// Core
import React, { Component } from "react";
import { string, func } from "prop-types";

// Instruments
import Styles from "./styles.m.css";

// Components
import { withProfile } from "hoc/withProfile";

export class Post extends Component {
    static propTypes = {
        _id:                  string.isRequired,
        avatar:               string.isRequired,
        comment:              string.isRequired,
        currentUserFirstName: string.isRequired,
        currentUserLastName:  string.isRequired,
        destroyPost:          func.isRequired,
    };

    _handleDestroyPost = () => {
        this.props.destroyPost(this.props._id);
    };

    render () {
        const {
            comment,
            avatar,
            currentUserFirstName,
            currentUserLastName,
            time,
        } = this.props;

        return (
            <section className = { Styles.post }>
                <span
                    className = { Styles.cross }
                    onClick = { this._handleDestroyPost }
                />
                <img src = { avatar } />
                <a>{`${currentUserFirstName} ${currentUserLastName}`}</a>
                <time>{time.format("MMMM Do YYYY, h:mm:ss a")}</time>
                <p>{comment}</p>
            </section>
        );
    }
}

export default withProfile(Post);
