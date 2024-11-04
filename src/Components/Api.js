import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchPosts = () => {
  return api.get("/posts");
};

export const fetchComments = (postId) => {
  return api.get(`/posts/${postId}/comments`);
};

export default api;
