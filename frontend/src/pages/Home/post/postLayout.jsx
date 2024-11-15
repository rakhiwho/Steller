import React, { useState, useEffect, useContext } from "react";
import { useSwipeable } from "react-swipeable";
import UserInfo from "../../../hooks/UserInfo";
import { FaRegHeart } from "react-icons/fa6";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import AddLike from "../../../hooks/addLike";
import CommentSection from "./comments";
import { MdCancel } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import DeletePost from "../../../hooks/deletePost";
import EditPost from "../../../hooks/edit";
import { useNavigate } from "react-router-dom";
import { context } from "../../../hooks/Context";
import "./style.css";
import { ReadMore } from "../../extras/ReadMore";
import MessagePop from "../../extras/MessagePop";

function PostLayout({ data, loading }) {
  const [liked, setLiked] = useState(
    data?.likedBy?.includes(localStorage.getItem("userID"))
  );
  const [deleting, setDeleting] = useState(false);
  const [watchComment, setWatchComment] = useState(false);
  const { Like, data: postData } = AddLike(data?._id);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likes, setLikes] = useState(data?.likes);
  const [threedot, setThreedot] = useState(false);
  const [editing, setEditing] = useState(false);
  const { setSelectedPage, darkTheme } = useContext(context);
  const { data: owner2 } = UserInfo(data?.owner);
  const date = new Date(data?.createdAt);
  const { deletePost } = DeletePost();
  const navigate = useNavigate();
  const { editPost } = EditPost();
  const [content, setContent] = useState(data?.caption);
  const [action, setAction] = useState(false);
  const likePost = async () => {
    setLiked(!liked);
    liked ? setLikes(likes - 1) : setLikes(likes + 1);
    if (data?._id) {
      await Like();
    } else {
      console.log("something went wrong");
    }
  };

  const left_img = () => {
    if (data?.post.length - 1 === 0 || currentIndex === 0) return;
    setCurrentIndex(currentIndex - 1);
  };

  const right_img = () => {
    if (data.post.length - 1 === 0) return;
    currentIndex === data?.post.length - 1
      ? setCurrentIndex(0)
      : setCurrentIndex(currentIndex + 1);
  };

  const Handlers = useSwipeable({
    onSwipedLeft: () => left_img(),
    onSwipedRight: () => right_img(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  const handleSubmit = async () => {
    await edited();

    setEditing(false);
  };
  const deleted = async () => {
    const res = await deletePost(data._id);
    if (res) {
      setAction(true);
      setDeleting(false);
    }
  };
  const edited = async () => {
    const res = await editPost(data._id, content);
    console.log(res);
    if (res) {
      setAction(true);
    }
  };
  useEffect(() => {
    if (action) {
      setInterval(() => {
        setAction(false);
      }, 2000);
    }
  }, [action]);
  return (
    <>
      {loading && <>loading Image</>}
      {!loading && (
        <div
          className={` ${deleting ? "blur-lg" : ""} ${
            !darkTheme ? "hover:shadow-2xl" : "post_Container"
          }   post_container overflow-hidden h-fit lg:w-[17.2vw]  relative mb-0 `}
        >
          <div
            {...Handlers}
            className={`${!darkTheme ? "bg-indigo-900" : ""} post-img mt-0`}
          >
            <div
              className={`${!darkTheme ? "bg-indigo-900" : ""} userName ml-0 `}
            >
              <p className="text-xs owner ml-0 mr-4 self-center  ">
                {owner2?.userName || "loading"}
              </p>
              <p className="date ">{date.toLocaleDateString("en-US")}</p>
            </div>

            <div className="h-[20vw] w-full">
              <img
                src={data?.post[currentIndex]}
                alt={`Post ${currentIndex + 1}`}
                className="carousel-image w-full h-full object-cover"
              />
            </div>

            <div
              className={` ${
                !darkTheme ? "bg-indigo-900" : ""
              } discription_of_img`}
            >
              <div className={`${!darkTheme ? "bg-indigo-900" : ""} likes`}>
                <button className=" flex mr-4">
                  {liked ? (
                    <FaHeart onClick={likePost} className="text-pink-600" />
                  ) : (
                    <FaRegHeart onClick={likePost} className="text-pink-600" />
                  )}
                  <span className="text-xs mt-0 ml-1">{likes}</span>
                </button>

                {/*.................... comment ...................... */}

                <FaRegComment onClick={() => setWatchComment(!watchComment)} />

                <div className={!watchComment ? "hidden" : ""}>
                  <MdCancel
                    onClick={() => setWatchComment(!watchComment)}
                    className="icon-cancel"
                  />
                  <CommentSection id={data?._id} />
                </div>
                {/* .........................three dot........................... */}
                {data?.owner == localStorage.getItem("userID") && (
                  <BsThreeDotsVertical
                    onMouseOver={() => setThreedot(true)}
                    onMouseOut={() => setThreedot(false)}
                    className="ml-[10vw]  size-4 "
                  />
                )}

                <div
                  onMouseOver={() => setThreedot(true)}
                  onMouseOut={() => setThreedot(false)}
                  className={`
                  ${
                    threedot ? " absolute right-3 text-xs bg-white " : "hidden"
                  } ${!darkTheme ? "bg-indigo-950 text-slate-300" : ""}`}
                >
                  <li
                    onClick={() => setDeleting(true)}
                    className={`${
                      !darkTheme ? "bg-indigo-950 text-slate-300" : ""
                    }list-none flex flex-row p-2 mr-1 w-full`}
                  >
                    <MdDelete className="mt-1 " /> delete{" "}
                  </li>
                  {/* ..........deleting popup............ */}

                  {/* {!darkTheme && <div className=' block h-[0.1vh] w-[93vw] bg-slate-300 ' > </div>} */}
                  <li
                    onClick={() => setEditing(true)}
                    className={`${
                      !darkTheme ? "bg-indigo-950 text-slate-300" : ""
                    } w-full list-none flex flex-row p-2 mr-1`}
                  >
                    <MdEdit className="mt-1" /> edit{" "}
                  </li>
                </div>
              </div>
              {/* ..........edit.............................. */}
              {!editing ? (
                <div
                  className={` ${
                    !darkTheme ? "bg-indigo-900" : ""
                  } flex-wrap lg:text-sm text-xs font-medium   mb-2`}
                >
                  <ReadMore
                    text={content}
                    maxLength={7}
                    textlength={content.length}
                  />
                </div>
              ) : (
                <>
                  <input
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className={` ${
                      !darkTheme ? "bg-indigo-950 text-slate-300" : ""
                    } input h-5 w-[full] border-none m-0 px-0 ml-1`}
                    type="text"
                  />
                  <input
                    value="save"
                    type="button"
                    onClick={handleSubmit}
                    name=""
                    id=""
                    className="absolute bottom-4 right-4 text-sm font-bold  mb-2 "
                  />
                </>
              )}
            </div>
          </div>
          <div
            className={` ${
              editing ? "mt-6" : ""
            } divider h-[1px] bg-indigo-600 my-1 w-42`}
          ></div>
        </div>
      )}
      {action && (
        <div>
          {" "}
          <MessagePop text="changes done successfully" />
        </div>
      )}
      {deleting && (
        <div
          className={`  bg-white text-indigo-950 rounded-xl fixed top-[44%] flex flex-col h-[15vh] w-[25vw] `}
        >
          <p className="py-4 pl-3">delete selected post ?</p>
          <div className="flex flex-row p-2">
            <button
              className="mx-5 px-3 rounded-md bg-indigo-950 text-slate-300"
              onClick={() => setDeleting(false)}
            >
              No
            </button>
            <button
              className="border-x-2 border-y-2 border-indigo-950 text-indigo-950 rounded-md px-3 hover:bg-indigo-950 hover:text-white"
              onClick={deleted}
            >
              Yes
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default PostLayout;
