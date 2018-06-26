// Core
import React, { Component } from "react";

// Instruments
import Styles from "./styles.m.css";
import api from "REST/api";

// Components
import Composer from "components/Composer";
import Post from "components/Post";
import StatusBar from "components/StatusBar";
import Counter from "components/Counter";
import Spinner from "components/Spinner";

export default class Feed extends Component {
    state = {
        postsData: [],
        isSpining: false,
    };

    componentDidMount () {
        this._fetchPostsAsync();
    }

    _setPostFetchingState = (isSpining) => {
        this.setState({ isSpining });
    };

    _fetchPostsAsync = async () => {
        try {
            this._setPostFetchingState(true);
            const postsData = await api.fetchPosts();

            this.setState({ postsData });
        } catch ({ message }) {
            console.error(message);
        } finally {
            this._setPostFetchingState(false);
        }
    };

    _createPostAsync = async (comment) => {
        try {
            this._setPostFetchingState(true);
            const post = await api.createPost(comment);

            this.setState(({ postsData }) => ({
                postsData: [post, ...postsData],
            }));
        } catch ({ message }) {
            console.error(message);
        } finally {
            this._setPostFetchingState(false);
        }
    };

    _destroyPostAsync = async (postId) => {
        try {
            this._setPostFetchingState(true);
            await api.deletePost(postId);

            this.setState(({ postsData }) => ({
                postsData: postsData.filter((post) => post.id !== postId),
            }));
        } catch ({ message }) {
            console.error(message);
        } finally {
            this._setPostFetchingState(false);
        }
    };

    render () {
        const { postsData, isSpining } = this.state;

        const posts = postsData.map((post) => (
            <Post
                { ...post }
                destroyPostAsync = { this._destroyPostAsync }
                key = { post.id }
            />
        ));

        return (
            <section className = { Styles.feed }>
                <StatusBar />
                <Spinner isSpining = { isSpining } />
                <Composer _createPostAsync = { this._createPostAsync } />
                <Counter postCount = { postsData.length } />
                {posts}
            </section>
        );
    }
}
