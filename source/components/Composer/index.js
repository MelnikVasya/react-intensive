// Core
import React, { Component } from "react";

// instruments
import Styles from "./styles.m.css";

// Components
import { Consumer } from "hoc/withProfile";

export default class Composer extends Component {
    render () {
        return (
            <Consumer>
                {({ avatar, currentUserFirstName }) => (
                    <section className = { Styles.composer }>
                        <img src = { avatar } />
                        <form>
                            <textarea
                                placeholder = { `What is in you mind ${currentUserFirstName}` }
                            />
                            <input type = 'submit' valuse = 'Post' />
                        </form>
                    </section>
                )}
            </Consumer>
        );
    }
}
