import axios from "axios";

const BASE_URL = "https://jsonplaceholder.typicode.com/posts";

// axios Posts
export const fetchPostsAPI = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};

// Add Post
export const addPostAPI = async (newPost) => {
  try {
    const response = await axios.post(BASE_URL, newPost);
    return response.data;
  } catch (error) {
    console.error("Error adding post:", error);
    throw error;
  }
};

// Update Post
export const updatePostAPI = async (updatedPost) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/${updatedPost.id}`,
      updatedPost
    );
    return response.data;
  } catch (error) {
    console.error("Error updating post:", error);
    throw error;
  }
};

// Delete Post
export const deletePostAPI = async (postId) => {
  try {
    await axios.delete(`${BASE_URL}/${postId}`);
    return postId;
  } catch (error) {
    console.error("Error deleting post:", error);
    throw error;
  }
};
