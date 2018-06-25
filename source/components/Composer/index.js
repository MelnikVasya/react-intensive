// Core
import React, { Component } from "react";
import { func } from "prop-types";

// instruments
import Styles from "./styles.m.css";

// Components
import { Consumer } from "hoc/withProfile";

export default class Composer extends Component {
    static propTypes = {
        _createPost: func.isRequired,
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

        return (
            <Consumer>
                {({ avatar, currentUserFirstName }) => (
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
                )}
            </Consumer>
        );
    }
}
