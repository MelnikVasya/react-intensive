// Core
import React, { Component } from "react";

// instruments
import avatar from "theme/assets/homer.png";
import moment from "moment";

export default class Post extends Component {
    render () {
        return (
            <section>
                <img src = { avatar } />
                <a>Vasya</a>
                <time>{moment().format("LLL")}</time>
                <p>Lorem ipsum dolor sit amet</p>
            </section>
        );
    }
}
