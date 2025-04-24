import axios from "axios";

const BASE_URL = "https://jsonplaceholder.typicode.com/posts";

// Fetch Posts
export const fetchPostsAPI = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data; // Return data if request is successful
  } catch (error) {
    console.error("Error fetching posts:", error); // Log error
    throw error; // Throw error for Redux to handle
  }
};

// Add Post
export const addPostAPI = async (newPost) => {
  try {
    const response = await axios.post(BASE_URL, newPost);
    return response.data; // Return data if request is successful
  } catch (error) {
    console.error("Error adding post:", error); // Log error
    throw error; // Throw error for Redux to handle
  }
};

// Update Post
export const updatePostAPI = async (updatedPost) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/${updatedPost.id}`,
      updatedPost
    );
    return response.data; // Return data if request is successful
  } catch (error) {
    console.error("Error updating post:", error); // Log error
    throw error; // Throw error for Redux to handle
  }
};

// Delete Post
export const deletePostAPI = async (postId) => {
  try {
    await axios.delete(`${BASE_URL}/${postId}`);
    return postId; // Return postId after deletion is successful
  } catch (error) {
    console.error("Error deleting post:", error); // Log error
    throw error; // Throw error for Redux to handle
  }
};
