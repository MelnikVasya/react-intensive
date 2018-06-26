// Core
import React, { Component } from "react";
import { string, bool } from "prop-types";

// Instruments
import Styles from "./styles.m.css";
import { withProfile } from "hoc/withProfile";
import classNames from "classnames";

export class StatusBar extends Component {
    static propTypes = {
        avatar:               string.isRequired,
        currentUserFirstName: string.isRequired,
        currentUserLastName:  string.isRequired,
        online:               bool.isRequired,
    };

    render () {
        const {
            avatar,
            currentUserFirstName,
            currentUserLastName,
            online,
        } = this.props;

        const statusStyles = classNames({
            [Styles.status]:  true,
            [Styles.offline]: !online,
            [Styles.online]:  online,
        });

        const statusText = online ? "Online" : "Ofline";

        return (
            <section className = { Styles.statusBar }>
                <div className = { statusStyles }>
                    <div>{statusText}</div>
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
