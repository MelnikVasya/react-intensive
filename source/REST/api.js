import { MAIN_URL, TOKEN } from "./config";

const api = {
    async fetchPosts () {
        const response = await fetch(`${MAIN_URL}?size=100`, {
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

        const { data } = await response.json();

        return data;
    },

    async deletePost (id) {
        const response = await fetch(`${MAIN_URL}/${id}`, {
            method:  "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization:  TOKEN,
            },
        });

        if (response.status !== 204) {
            throw new Error("Post not deleted");
        }
    },

    async likePost (id) {
        const response = await fetch(`${MAIN_URL}/${id}`, {
            method:  "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization:  TOKEN,
            },
        });

        if (response.status !== 200) {
            throw new Error("Post not liked");
        }

        const { data } = await response.json();

        return data;
    },
};

export default api;
