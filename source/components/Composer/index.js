// Core
import React, { Component } from "react";
import { func } from "prop-types";

// instruments
import Styles from "./styles.m.css";

// Components
import { Consumer } from "hoc/withProfile";

export default class Composer extends Component {
    static propTypes = {
        createPost: func.isRequired,
    };

    constructor () {
        super();
        this.handleUpdate = ::this._handleUpdate;
        this.handleSubmit = ::this._handleSubmit;
    }

    state = {
        comment: "",
    };

    _handleUpdate (e) {
        const { value: comment } = e.target;

        this.setState({ comment });
    }

    _handleSubmit (e) {
        e.preventDefault();
        const { comment } = this.state;

        if (!comment) {
            return;
        }

        this.props.createPost(comment);
        this.setState({ comment: "" });
    }

    render () {
        const { comment } = this.state;

        return (
            <Consumer>
                {({ avatar, currentUserFirstName }) => (
                    <section className = { Styles.composer }>
                        <img src = { avatar } />
                        <form onSubmit = { this.handleSubmit }>
                            <textarea
                                placeholder = { `What is in you mind ${currentUserFirstName}` }
                                value = { comment }
                                onChange = { this.handleUpdate }
                            />
                            <input type = 'submit' valuse = 'Post' />
                        </form>
                    </section>
                )}
            </Consumer>
        );
    }
}
