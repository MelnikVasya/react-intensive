// Core
import React, { Component } from "react";
import { func, string } from "prop-types";

// instruments
import Styles from "./styles.m.css";

// Components
import { withProfile } from "hoc/withProfile";

export class Composer extends Component {
    static propTypes = {
        _createPost:          func.isRequired,
        avatar:               string.isRequired,
        currentUserFirstName: string.isRequired,
    };

    state = {
        comment: "",
    };

    _submitComment = () => {
        const { comment } = this.state;

        if (!comment) {
            return null;
        }

        this.props._createPost(comment);
        this.setState({ comment: "" });
    };

    _handleUpdateComment = (e) => {
        const { value: comment } = e.target;

        this.setState({ comment });
    };

    _handleFormSubmit = (e) => {
        e.preventDefault();
        this._submitComment();
    };

    render () {
        const { comment } = this.state;
        const { avatar, currentUserFirstName } = this.props;

        return (
            <section className = { Styles.composer }>
                <img src = { avatar } />
                <form onSubmit = { this._handleFormSubmit }>
                    <textarea
                        placeholder = { `What is in you mind ${currentUserFirstName}` }
                        value = { comment }
                        onChange = { this._handleUpdateComment }
                    />
                    <input type = 'submit' valuse = 'Post' />
                </form>
            </section>
        );
    }
}

export default withProfile(Composer);
