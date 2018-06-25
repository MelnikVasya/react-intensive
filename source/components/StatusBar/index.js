// Core
import React, { Component } from "react";

// Instruments
import Styles from "./styles.m.css";
import { withProfile } from "hoc/withProfile";

export class StatusBar extends Component {
    render () {
        const {
            avatar,
            currentUserFirstName,
            currentUserLastName,
        } = this.props;

        return (
            <section className = { Styles.statusBar }>
                <div className = { `${Styles.status} ${Styles.offline}` }>
                    <div>Offline</div>
                    <span />
                </div>
                <button>
                    <img src = { avatar } />
                    <span>{currentUserFirstName}</span>
                    &nbsp;
                    <span>{currentUserLastName} </span>
                </button>
            </section>
        );
    }
}

export default withProfile(StatusBar);
