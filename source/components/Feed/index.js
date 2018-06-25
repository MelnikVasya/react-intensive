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
    state = {
        postsData: [],
    };

    _createPost = (comment) => {
        this.setState(({ postsData }) => ({
            postsData: [{ comment, _id: getUniqueID() }, ...postsData],
        }));
    };

    _destroyPost = (postId) => {
        this.setState(({ postsData }) => ({
            postsData: postsData.filter((post) => post._id !== postId),
        }));
    };

    render () {
        const { postsData } = this.state;

        const posts = postsData.map((post) => (
            <Post { ...post } destroyPost = { this._destroyPost } key = { post._id } />
        ));

        return (
            <section className = { Styles.feed }>
                <StatusBar />
                <Composer _createPost = { this._createPost } />
                {posts}
            </section>
        );
    }
}
