import React, { useContext, useRef } from "react";
import { PostList } from "../../Store/PostListStore";
import { Form, useNavigate } from "react-router-dom";

function CreatePost() {
  let { addPost } = useContext(PostList);
  let navigate = useNavigate();
  let userIdElement = useRef();
  let postTitleElement = useRef();
  let postContentElement = useRef();
  let reactionsElement = useRef();
  let tagsElement = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    let userId = userIdElement.current.value;
    let postTitle = postTitleElement.current.value;
    let postContent = postContentElement.current.value;
    let reactions = reactionsElement.current.value;
    let tags = tagsElement.current.value.split(" ");

    userIdElement.current.value = "";
    postTitleElement.current.value = "";
    postContentElement.current.value = "";
    reactionsElement.current.value = "";
    tagsElement.current.value = "";
    /* --- For Sending POST To Server --- */
    fetch("https://dummyjson.com/posts/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: postTitle,
        body: postContent,
        reactions: {
          likes: reactions,
          disLikes: 0,
        },
        userId: userId,
        tags: tags,
      }),
    })
      .then((res) => res.json())
      .then((post) => {
        addPost(post);
        navigate("/");
      });
  };
  return (
    <div className="m-5">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="userId" className="form-label">
            User Id
          </label>
          <input
            type="text"
            className="form-control"
            id="userId"
            name="userId"
            ref={userIdElement}
            placeholder="Enter Your User Id."
          />
        </div>
        <div className="mb-3">
          <label htmlFor="Post-title" className="form-label">
            Post Title
          </label>
          <input
            type="text"
            className="form-control"
            id="Post-title"
            ref={postTitleElement}
            name="title"
            placeholder="Enter What You Feel Today."
          />
        </div>
        <div className="mb-3">
          <label htmlFor="Post-content" className="form-label">
            Post Content
          </label>
          <textarea
            rows="4"
            type="text"
            className="form-control"
            id="Post-content"
            ref={postContentElement}
            name="body"
            placeholder="Enter Your Post Message."
          />
        </div>
        <div className="mb-3">
          <label htmlFor="reaction" className="form-label">
            Number Of Reaction
          </label>
          <input
            type="text"
            className="form-control"
            id="reaction"
            name="reaactions"
            ref={reactionsElement}
            placeholder="Reaction On This Post."
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tags" className="form-label">
            Enter Your Tags
          </label>
          <input
            type="text"
            className="form-control"
            id="tags"
            ref={tagsElement}
            name="tags"
            placeholder="Enter Your Tags With Space."
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Post
        </button>
      </form>
    </div>
  );
}
/*---- For Submiting Data On The Bases of Routing ---- */
// export const createPostAction = async (data) => {
//   let formData = await data.request.formData();
//   let postData = Object.fromEntries(formData);
//   console.log(postData);
//   fetch("https://dummyjson.com/posts/add", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       title: postTitle,
//       body: postContent,
//       reactions: {
//         likes: reactions,
//         disLikes: 0,
//       },
//       userId: userId,
//       tags: tags,
//     }),
//   })
//     .then((res) => res.json())
//     .then((post) => {
//       addPost(post);
//       navigate("/");
//     });
// };
export default CreatePost;
