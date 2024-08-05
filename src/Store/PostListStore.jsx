import { createContext, useReducer, useState, useEffect } from "react";

/* --- Defualt Structure Of Post Methods And Value --- */
const defaultPost = {
  postList: [],
  addPost: () => {},
  deletePost: () => {},
  fetching: false,
};
export const PostList = createContext(defaultPost);

/* --- Reeducer Funtion To Take Action --- */
const postListReducer = (currentPostList, action) => {
  let newPostList = currentPostList;
  if (action.type === "DELETE_POST") {
    newPostList = currentPostList.filter(
      (post) => post.id !== action.payload.postId
    );
  } else if (action.type === "ADDINTIAL_POSTS") {
    newPostList = action.payload.posts;
  } else if (action.type === "ADD_POST") {
    newPostList = [action.payload, ...currentPostList];
  }
  return newPostList;
};

/* --- Make Unique Id For User --- */
// const uid = function () {
//   return Date.now().toString(36) + Math.random().toString(36).substr(2);
// };

/* --- Provides All The Methods And Value To Component --- */
const PostListProvider = ({ children }) => {
  let [postList, dispatchList] = useReducer(postListReducer, defaultPostList);
  let [fetching, setFetching] = useState(false);

  // const addPost = (userId, postTitle, postContent, reactions, tags) => {
  //   dispatchList({
  //     type: "ADD_POST",
  //     payload: {
  //       id: uid(),
  //       title: postTitle,
  //       body: postContent,
  //       reaction: reactions,
  //       userId: userId,
  //       tags: tags,
  //     },
  //   });
  // };

  /* --- For Sending POST To Server --- */
  const addPost = (post) => {
    dispatchList({
      type: "ADD_POST",
      payload: post,
    });
  };

  const addIntialPost = (posts) => {
    dispatchList({
      type: "ADDINTIAL_POSTS",
      payload: {
        posts,
      },
    });
  };

  const deletePost = (postId) => {
    dispatchList({
      type: "DELETE_POST",
      payload: {
        postId: postId,
      },
    });
  };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const fatchingData = async () => {
      try {
        setFetching(true);
        let POST_API_kEY = await fetch("https://dummyjson.com/posts", {
          signal,
        });
        let POSTS_JSON = await POST_API_kEY.json();
        addIntialPost(POSTS_JSON.posts);
        setFetching(false);
      } catch (error) {
        console.log("Error Occurs During Fatching Posts From Server", error);
      }
    };
    fatchingData();

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <PostList.Provider
      value={{
        postList: postList,
        addPost: addPost,
        deletePost: deletePost,
        fetching: fetching,
      }}
    >
      {children}
    </PostList.Provider>
  );
};

/* --- Defualt Posts --- */
const defaultPostList = [
  // {
  //   id: "1",
  //   title: "Goging To Other Country",
  //   body: "Hi, Friends I am going to Lass Vagas for enjoying our summer vacation.",
  //   reaction: "2",
  //   userId: "user-3",
  //   tags: ["vacation", "Lass Vagas", "Enjoyment"],
  // },
  // {
  //   id: "2",
  //   title: "Mama Mie Pass Ho GYA..😍",
  //   body: "Mama after doing a lot of masatii finally a passed in graduation.",
  //   reaction: "15",
  //   userId: "user-2",
  //   tags: ["Happy", "Pass", "Mama", "Mastii"],
  // },
];

export default PostListProvider;
