// Core
import React, { Component } from "react";

// Instruments
import Styles from "./styles.m.css";
import { Consumer } from "hoc/withProfile";

export default class StatusBar extends Component {
    render () {
        return (
            <Consumer>
                {({ avatar, currentUserFirstName, currentUserLastName }) => (
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
                )}
            </Consumer>
        );
    }
}
