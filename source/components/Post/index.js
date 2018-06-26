// Core
import React, { Component } from "react";
import { string, func, number } from "prop-types";

// Instruments
import Styles from "./styles.m.css";
import moment from "moment";

// Components
import Like from "components/Like";
import { withProfile } from "hoc/withProfile";

export class Post extends Component {
    static propTypes = {
        avatar:           string.isRequired,
        comment:          string.isRequired,
        created:          number.isRequired,
        destroyPostAsync: func.isRequired,
        firstName:        string.isRequired,
        id:               string.isRequired,
        lastName:         string.isRequired,
        _likePostAsync:   func.isRequired,
    };

    _handleDestroyPost = () => {
        this.props.destroyPostAsync(this.props.id);
    };

    _getCross = () => {
        const {
            currentUserFirstName,
            currentUserLastName,
            firstName,
            lastName,
        } = this.props;

        const isCurrentUser =
            `${currentUserFirstName}_${currentUserLastName}` ===
            `${firstName}_${lastName}`;

        return isCurrentUser ? (
            <span className = { Styles.cross } onClick = { this._handleDestroyPost } />
        ) : null;
    };

    _createdTimeHuman = () =>
        moment.unix(this.props.created).format("MMMM Do YYYY, h:mm:ss a");

    render () {
        const {
            comment,
            avatar,
            firstName,
            lastName,
            _likePostAsync,
            id,
            likes,
        } = this.props;

        return (
            <section className = { Styles.post }>
                {this._getCross()}
                <img src = { avatar } />
                <a>{`${firstName} ${lastName}`}</a>
                <time>{this._createdTimeHuman()}</time>
                <p>{comment}</p>
                <Like { ...{ _likePostAsync, id, likes } } />
            </section>
        );
    }
}

export default withProfile(Post);
