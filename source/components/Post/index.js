// Core
import React, { Component } from "react";

// Instruments
import moment from "moment";
import Styles from "./styles.m.css";

// Components
import { Consumer } from "hoc/withProfile";

export default class Post extends Component {
    _handleDestroyPost = () => {
        this.props.destroyPost(this.props._id);
    };

    render () {
        const { comment } = this.props;

        return (
            <Consumer>
                {({ avatar, currentUserFirstName, currentUserLastName }) => (
                    <section className = { Styles.post }>
                        <span
                            className = { Styles.cross }
                            onClick = { this._handleDestroyPost }
                        />
                        <img src = { avatar } />
                        <a>{`${currentUserFirstName} ${currentUserLastName}`}</a>
                        <time>{moment().format("LLL")}</time>
                        <p>{comment}</p>
                    </section>
                )}
            </Consumer>
        );
    }
}
