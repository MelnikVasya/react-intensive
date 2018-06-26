// Core
import React, { Component } from "react";
import { hot } from "react-hot-loader";

// Instruments
import avatar from "theme/assets/homer.png";

// Components
import Feed from "components/Feed";
import Catcher from "components/Catcher";
import { Provider } from "hoc/withProfile";

const options = {
    avatar,
    currentUserFirstName: "Василий",
    currentUserLastName:  "Мельник",
};

@hot(module)
export default class App extends Component {
    render () {
        return (
            <Catcher>
                <Provider value = { options }>
                    <Feed />
                </Provider>
            </Catcher>
        );
    }
}
