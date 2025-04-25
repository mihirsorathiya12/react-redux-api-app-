const BASE_URL = "https://jsonplaceholder.typicode.com/posts";

// GET all posts
export const fetchPostsAPI = async () => {
  const response = await fetch(BASE_URL);
  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }
  return await response.json();
};

// ADD new post
export const addPostAPI = async (post) => {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });

  if (!response.ok) {
    throw new Error("Failed to add post");
  }

  return await response.json();
};

// DELETE post
export const deletePostAPI = async (id) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete post");
  }

  return id;
};

// UPDATE post
export const updatePostAPI = async (post) => {
  const response = await fetch(`${BASE_URL}/${post.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });

  if (!response.ok) {
    throw new Error("Failed to update post");
  }

  return await response.json();
};
