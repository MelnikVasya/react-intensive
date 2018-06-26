// Core
import React, { Component } from "react";
import gsap from "gsap";
import { Transition } from "react-transition-group";

// Instruments
import Styles from "./styles.m.css";
import api from "REST/api";
import { GROUP_ID } from "REST/config";
import { socket } from "socket/init";

// Components
import Composer from "components/Composer";
import Post from "components/Post";
import StatusBar from "components/StatusBar";
import Counter from "components/Counter";
import Spinner from "components/Spinner";
import { withProfile } from "hoc/withProfile";

export class Feed extends Component {
    state = {
        postsData: [],
        isSpining: false,
        online:    true,
    };

    componentDidMount () {
        const { currentUserFirstName, currentUserLastName } = this.props;

        this._fetchPostsAsync();

        socket.on("connect", () => {
            this.setState({
                online: true,
            });
        });

        socket.on("disconnect", () => {
            this.setState({
                online: false,
            });
        });

        socket.emit("join", GROUP_ID);

        socket.on("create", (response) => {
            const { data: newPost, meta } = JSON.parse(response);

            const isCurrentUser =
                `${currentUserFirstName}_${currentUserLastName}` ===
                `${meta.authorFirstName}_${meta.authorLastName}`;

            if (isCurrentUser) {
                return null;
            }

            this.setState(({ postsData }) => ({
                postsData: [newPost, ...postsData],
            }));
        });

        socket.on("like", (response) => {
            const { data: likedPost, meta } = JSON.parse(response);

            const isCurrentUser =
                `${currentUserFirstName}_${currentUserLastName}` ===
                `${meta.authorFirstName}_${meta.authorLastName}`;

            if (isCurrentUser) {
                return null;
            }

            this.setState(({ postsData }) => ({
                postsData: postsData.map(
                    (post) => post.id === likedPost.id ? likedPost : post
                ),
            }));
        });

        socket.on("remove", (response) => {
            const { data: removedPost, meta } = JSON.parse(response);

            const isCurrentUser =
                `${currentUserFirstName}_${currentUserLastName}` ===
                `${meta.authorFirstName}_${meta.authorLastName}`;

            if (isCurrentUser) {
                return null;
            }

            this.setState(({ postsData }) => ({
                postsData: postsData.filter((post) => post.id !== removedPost.id),
            }));
        });
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

    _likePostAsync = async (postId) => {
        try {
            this._setPostFetchingState(true);
            const likedPost = await api.likePost(postId);

            this.setState(({ postsData }) => ({
                postsData: postsData.map(
                    (post) => post.id === likedPost.id ? likedPost : post
                ),
            }));
        } catch ({ message }) {
            console.error(message);
        } finally {
            this._setPostFetchingState(false);
        }
    };

    _animateComposerAppear = (composer) => {
        gsap.fromTo(composer, 2, { opacity: 0, y: -50 }, { opacity: 1, y: 0 });
    };

    render () {
        const { postsData, isSpining, online } = this.state;

        const posts = postsData.map((post) => (
            <Post
                { ...post }
                _likePostAsync = { this._likePostAsync }
                destroyPostAsync = { this._destroyPostAsync }
                key = { post.id }
            />
        ));

        return (
            <section className = { Styles.feed }>
                <StatusBar online = { online } />
                <Spinner isSpining = { isSpining } />
                <Transition
                    appear
                    in
                    timeout = { 2000 }
                    onEnter = { this._animateComposerAppear }>
                    <Composer _createPostAsync = { this._createPostAsync } />
                </Transition>
                <Counter postCount = { postsData.length } />
                {posts}
            </section>
        );
    }
}

export default withProfile(Feed);
