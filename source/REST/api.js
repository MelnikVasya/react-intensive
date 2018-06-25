import { MAIN_URL, TOKEN } from "./config";

const api = {
    async fetchPosts () {
        const response = await fetch(MAIN_URL, {
            method: "GET",
        });

        if (response.status !== 200) {
            throw new Error("Posts where not loaded");
        }

        const { data: posts } = await response.json();

        return posts;
    },

    async createPost (comment) {
        const response = await fetch(MAIN_URL, {
            method:  "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization:  TOKEN,
            },
            body: JSON.stringify({ comment }),
        });

        if (response.status !== 200) {
            throw new Error("Post not creacted");
        }

        const { data: post } = await response.json();

        return post;
    },

    // async deletePost ()
};

export default api;
