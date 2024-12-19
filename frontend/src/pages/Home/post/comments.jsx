import React, { useContext, useState } from "react";
import Comment from "./comment";
import GetComment from "../../../hooks/GetComment";
import { IoMdSend } from "react-icons/io";
import PostComment from "../../../hooks/postComment.js";
import { context } from "../../../hooks/Context.jsx";
function CommentSection({ id }) {
  const { data, loading, error } = GetComment(id);
 
  const [content, setContent] = useState("");
  const { AddComment } = PostComment();
  const { darkTheme } = useContext(context);
  const handleSubmit = async () => {
    if (content) {
      await AddComment(id, content);
      setContent("");
    } else {
      console.log("something went wrong");
    }
  };

  return (
    <>
      <div className="comment ">
        <div className=" header bg-gradient-to-r from-indigo-950 to-indigo-800 ">
          Comments...
        </div>

        <div
          className={` ${!darkTheme ? "bg-indigo-900" : ""} all_comments p-3`}
        >
          {loading && <>loading...</>}
          {Array.isArray(data) ? (
            data.map((c) => {
              return !c ? [] : <Comment key={c._id} comment={c} />;
            })
          ) : (
            <>{data}</>
          )}
        </div>

        <div className={`${!darkTheme ? "bg-indigo-900" : ""} comment-input`}>
          <input
            value={content}
            className={`${!darkTheme ? "bg-indigo-950 text-slate-200" : " text-black"} font-medium  `}
            onChange={(e) => setContent(e.target.value)}
            type="text"
            name=""
            id=""
          />
          <IoMdSend
            className={`${
              !darkTheme ? "bg-indigo-950 text-slate-300 " : ""
            } icon-send`}
            onClick={handleSubmit}
          />
        </div>
      </div>
    </>
  );
}

export default CommentSection;
