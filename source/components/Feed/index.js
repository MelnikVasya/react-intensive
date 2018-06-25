// Core
import React, { Component } from "react";

// Instruments
import Styles from "./styles.m.css";
import { getUniqueID } from "instruments";

// Components
import Composer from "components/Composer";
import Post from "components/Post";
import StatusBar from "components/StatusBar";

export default class Feed extends Component {
    constructor () {
        super();
        this.createPost = ::this._createPost;
    }

    state = {
        postsData: [],
    };

    _createPost (comment) {
        this.setState(({ postsData }) => ({
            postsData: [{ comment, _id: getUniqueID() }, ...postsData],
        }));
    }

    render () {
        const { postsData } = this.state;
        const posts = postsData.map((post) => (
            <Post comment = { post.comment } key = { post._id } />
        ));

        return (
            <section className = { Styles.feed }>
                <StatusBar />
                <Composer createPost = { this.createPost } />
                {posts}
            </section>
        );
    }
}
