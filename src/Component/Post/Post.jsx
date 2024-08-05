import React, { useContext, useState } from "react";
import "./Post.css";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
import { PostList as PostListData } from "../../Store/PostListStore";
function Post({ post }) {
  let [isLiked, setisLiked] = useState(true);
  let clicked = () => {
    setisLiked(!isLiked);
  };

  let { deletePost } = useContext(PostListData);
  return (
    <div>
      <div
        className="card my-lg-3 mx-lg-3 card-size"
        style={{ width: "25rem" }}
      >
        <TiDelete className="delete-icon" onClick={() => deletePost(post.id)} />
        {/* <img src="..." className="card-img-top" alt="..." /> */}
        <div className="card-body">
          <h5 className="card-title">{post.title}</h5>
          <p className="card-text">{post.body}</p>
          {post.tags.map((tag) => (
            <span className="badge text-bg-primary mx-1" key={tag}>
              {tag}
            </span>
          ))}
        </div>
        <button
          type="button"
          className="btn btn-primary mb-lg-3 mx-3 height flex"
          onClick={clicked}
        >
          <p>
            {isLiked ? (
              <CiHeart className="heart-icon" />
            ) : (
              <FaHeart className="fil-heart" />
            )}
            <span className="noLikes">{post.reactions.likes}</span>
          </p>
        </button>
      </div>
    </div>
  );
}

export default Post;
