import React, { useState, useContext } from "react";
import { context } from "../../../hooks/Context";
import UseGetPost from "../../../hooks/useGetPost";
import PostLayout from "./postLayout";
import { FaSignsPost } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { RiMessage2Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import Loading from "../../extras/loading";
import MessagePop from "../../extras/MessagePop";

function Post() {
  const { darkTheme } = useContext(context);

  const { homePost, loading } = UseGetPost();
  const navigate = useNavigate();

  return (
    <>
      <div
        className={` ${
          !darkTheme ? "bg-indigo-900 text-slate-300" : ""
        } absolute m-0 left-[3.2vw]  h-screen  overflow-x-scroll lg:w-[96.5vw]  md:w-[95vw] w-[94.5vw] pl-6 py-0 user_post   `}
      >
        {/* ...........header.......... */}
        <div
          className={`  ${
            !darkTheme ? "bg-indigo-900 text-slate-300" : "bg-white"
          } flex flex-row justify-between fixed pt-3  z-[99] h-fit  content-center  text-xl text-indigo-900 `}
        >
          <div className="flex mt-0  flex-row flex-grow w-[80vw] lg:w-[80vw]">
            <FaSignsPost className="mr-1 mt-2" />
            <p className={` ${!darkTheme ? "text-slate-300" : ""}`}> Posts </p>
          </div>
          <div className={`  self-center w-[10vw] justify-around flex-1 flex flex-row mr-10 `}>
            <CgProfile
              onClick={() => navigate("/profile")}
              className="   self-center size-6 mt-2 m-1 hover:text-white hover:bg-indigo-700 rounded-md  "
            />
            <RiMessage2Fill
              onClick={() => navigate("/chat")}
              className="self-center size-6 mt-2 m-1 hover:text-white hover:bg-indigo-700 rounded-sm "
            />
          </div>
        </div>
        {!darkTheme && (
          <div className=" block h-[0.1vh] w-[97vw] bg-slate-300 "> </div>
        )}
        {loading && <Loading text1="please , wait a moment" text="loading" />}
        <div className={`   divider m-0 `}></div>
        {!loading && (
          <div className="flex flex-row  w-[94vw]    justify-around flex-wrap">
            {Array.isArray(homePost) &&
              homePost.map((data) => (
                <div key={data._id}>
                  <PostLayout data={data} />
                </div>
              ))}
            {Array.isArray(homePost) && homePost.length === 0 && (
              <p className="text-2xl capitalize fixed top-[50%]">
                there is nothing to see 👀{" "}
              </p>
            )}
            {!Array.isArray(homePost) && (
              <MessagePop text="something went wrong" />
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default Post;
