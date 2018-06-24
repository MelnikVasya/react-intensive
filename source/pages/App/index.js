// Core
import React, { Component } from "react";
import { hot } from "react-hot-loader";

// Instruments
import avatar from "./theme/assets/homer.png";

// Components
import Feed from "components/Feed";

const options = {
    avatar,
    currentUserFirstName: "Vasyl",
    currentUserLastName:  "Melnyk",
};

@hot(module)
export default class App extends Component {
    render () {
        return (
            <section>
                <Feed { ...options } />
            </section>
        );
    }
}
