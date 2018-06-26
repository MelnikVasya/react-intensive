// Core
import React, { Component } from "react";
import { string, func, arrayOf, shape } from "prop-types";
import classNames from "classnames";

// Instruments
import Styles from "./styles.m.css";
import { withProfile } from "hoc/withProfile";

export class Like extends Component {
    static propTypes = {
        _likePostAsync: func.isRequired,
        id:             string.isRequired,
        likes:          arrayOf(
            shape({
                firstName: string.isRequired,
                lastName:  string.isRequired,
            })
        ).isRequired,
    };

    static defaultProps = {
        likes: [],
    };

    state = {
        showLikers: false,
    };

    _showLikers = () => {
        this.setState({ showLikers: true });
    };

    _hideLikers = () => {
        this.setState({ showLikers: false });
    };

    _likePost = () => {
        const { _likePostAsync, id } = this.props;

        _likePostAsync(id);
    };

    _getLikeByMe = () => {
        const { currentUserFirstName, currentUserLastName, likes } = this.props;

        return likes.some(
            ({ firstName, lastName }) =>
                firstName === currentUserFirstName &&
                lastName === currentUserLastName
        );
    };

    _getLikeStyles = () => {
        const likedByMe = this._getLikeByMe();

        return classNames(Styles.icon, {
            [Styles.liked]: likedByMe,
        });
    };

    _getLikesDescription = () => {
        const { likes } = this.props;

        return likes.length;
    };

    _getLikersList = () => {
        const { showLikers } = this.state;
        const { likes } = this.props;

        const likesJSX = likes.map(({ firstName, lastName }, id) => (
            <li key = { id }>
                {firstName} {lastName}
            </li>
        ));

        return likes.length && showLikers ? <ul>{likesJSX}</ul> : null;
    };

    render () {
        const likes = this._getLikersList();
        const likeStyles = this._getLikeStyles();
        const likesDescription = this._getLikesDescription();

        return (
            <section className = { Styles.like }>
                <span className = { likeStyles } onClick = { this._likePost }>
                    Like
                </span>
                <div>
                    {likes}
                    <span
                        onMouseEnter = { this._showLikers }
                        onMouseLeave = { this._hideLikers }>
                        {likesDescription}
                    </span>
                </div>
            </section>
        );
    }
}

export default withProfile(Like);
