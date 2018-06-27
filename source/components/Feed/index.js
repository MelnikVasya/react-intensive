// Core
import React, { Component } from "react";
import gsap from "gsap";
import {
    Transition,
    CSSTransition,
    TransitionGroup
} from "react-transition-group";

// Instruments
import Styles from "./styles.m.css";
import api from "REST/api";
import { GROUP_ID } from "REST/config";
import { socket } from "socket/init";
import moment from "moment";

// Components
import Composer from "components/Composer";
import Post from "components/Post";
import StatusBar from "components/StatusBar";
import Counter from "components/Counter";
import Spinner from "components/Spinner";
import Postman from "components/Postman";
import { withProfile } from "hoc/withProfile";

export class Feed extends Component {
    constructor () {
        super();
        this.state = {
            postsData:     [],
            isSpining:     false,
            online:        true,
            isShowPostman: this._getIsShowPostman(),
        };
    }

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
                postsData: postsData.filter(
                    (post) => post.id !== removedPost.id
                ),
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

    _getIsShowPostman = () => {
        const postmanShowIn = localStorage.getItem("postmanAppearedIn");
        const postmanShowInDate = moment.unix(parseInt(postmanShowIn, 10));

        if (!postmanShowInDate.isValid()) {
            return true;
        }

        return moment().diff(postmanShowInDate, "days") > 1;
    };

    _setPostmanAppearedIn = () => {
        localStorage.setItem("postmanAppearedIn", moment().unix());
    };

    _animatePostmanAppear = (postman) => {
        gsap.fromTo(postman, 2, { opacity: 0, x: 0 }, { opacity: 1, x: -280 });
    };

    _animatePostmanDisappear = (postman) => {
        gsap.fromTo(postman, 2, { opacity: 1, x: -280 }, { opacity: 0, x: 0 });
    };

    _postmanAppeared = () => {
        this._setPostmanAppearedIn();

        setTimeout(() => {
            this.setState({ isShowPostman: false });
        }, 5000);
    };

    render () {
        const { postsData, isSpining, online, isShowPostman } = this.state;

        const posts = postsData.map((post) => (
            <CSSTransition
                classNames = { {
                    enter:       Styles.postInStart,
                    enterActive: Styles.postInEnd,
                    exit:        Styles.postOutStart,
                    exitActive:  Styles.postOutEnd,
                } }
                key = { post.id }
                timeout = { { enter: 500, exit: 400 } }>
                <Post
                    { ...post }
                    _likePostAsync = { this._likePostAsync }
                    destroyPostAsync = { this._destroyPostAsync }
                />
            </CSSTransition>
        ));

        return (
            <section className = { Styles.feed }>
                <StatusBar online = { online } />
                <Spinner isSpining = { isSpining } />
                <Composer _createPostAsync = { this._createPostAsync } />
                <Counter postCount = { postsData.length } />
                <TransitionGroup>{posts}</TransitionGroup>
                <Transition
                    appear
                    in = { isShowPostman }
                    timeout = { 2000 }
                    onEnter = { this._animatePostmanAppear }
                    onEntered = { this._postmanAppeared }
                    onExit = { this._animatePostmanDisappear }>
                    <Postman />
                </Transition>
            </section>
        );
    }
}

export default withProfile(Feed);
