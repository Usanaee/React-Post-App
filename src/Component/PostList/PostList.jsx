import React, { useContext } from "react";
import Post from "../Post/Post";
import { PostList as PostListData } from "../../Store/PostListStore";
import DefaultMessage from "../DefaultMessage/DefaultMessage";
import LaodingSpinner from "../Loader/LaodingSpinner";
import { useLoaderData } from "react-router-dom";

function PostList() {
  let { postList, fetching } = useContext(PostListData);
  // const postList = useLoaderData();
  // console.log(postList);

  /* Fetch data by function */
  // const handlePostsfromServer = () => {
  //   try {
  //     let POST_API_kEY = await fetch("https://dummyjson.com/posts");
  //     let POSTS_JSON = await POST_API_kEY.json();
  //     console.log(POSTS_JSON);
  //     addIntialPost(POSTS_JSON.posts);
  //   } catch (error) {
  //     console.log("Error Occurs During Fatching Posts From Server", error);
  //   }
  // };
  return (
    <div className="d-flex flex-lg-wrap justify-content-center align-items-center">
      {fetching && <LaodingSpinner />}
      {!fetching && postList.length === 0 && <DefaultMessage />}
      {!fetching && postList.map((post) => <Post key={post.id} post={post} />)}
    </div>
  );
}

// export const postLoader = () => {
//   return fetch("https://dummyjson.com/posts")
//     .then((res) => res.json())
//     .then((data) => {
//       console.log(data);
//       return data.posts;
//     });
// };
export default PostList;
