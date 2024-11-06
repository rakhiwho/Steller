import React, { useContext, useEffect, useState } from "react";
import "./style.css";
import { context } from "../../hooks/Context";
import UserInfo from "../../hooks/UserInfo";
import { useNavigate, useParams } from "react-router-dom";
import { FaAngleDoubleLeft } from "react-icons/fa";
import useConversation from "../../hooks/useconversation";
import UserPost from "../Profile/UserPost";
import Followings from "./followings/followings";
import UseFollow from "../../hooks/UseFollow";
import { UseSocketContext } from "../../hooks/socketContext";
import Getfollowing from "../../hooks/Getfollowing";

function UserWholeInfo(data) {
   
  const { usefollow } = UseFollow();
  const { setSelectedConversation } = useConversation();
  const navigate = useNavigate();
  const { defaultPfp, setFriend, friend , darkTheme } = useContext(context);
  const [youFollow, setYouFollow] = useState(
    data.data?.followers.includes(localStorage.getItem("userID"))
  );
  const [following, setFollwing] = useState(false);

  const [followers, setFollowers] = useState(data.data?.followers.length);

  const followingYou = !data.data?.following.includes(
    localStorage.getItem("userID")
  );
  const pfp = data.data?.profilePic || defaultPfp;
  const followingStatus = youFollow ? "following" : " follow";

  const handleMessage = async () => {
    navigate(`/chat/${data?.data._id}`);

    setSelectedConversation(data?.data._id);
  };

  const handleFollow = async () => {
    if (data?._id) await usefollow(data?._id);
    if (youFollow) {
      setFollowers(followers - 1);
    } else {
      setFollowers(followers + 1);
    }
    setYouFollow(!youFollow);
  };

  return (
    <>
      <div  className={` ${!darkTheme ? 'bg-indigo-950 text-slate-300':''}  profile   `}>
        <button
          onClick={() => navigate("/chat")}
          className={`${!darkTheme ?'text-slate-300':''}  absolute right-5 m-2  flex justify-center text-indigo-800`}
        >
          Go back <FaAngleDoubleLeft className="mt-1 ml-1 self-center" />{" "}
        </button>
        <div className={` ${!darkTheme ?'bg-indigo-900 text-slate-300':''} profile-info`}>
          <div className={`avatar self-center `}>
            <div className="w-28 h-28 contact-img rounded-full">
              <img src={pfp} />
            </div>
          </div>
          <div className="divider px-3"></div>
          <div className="info">
            <div className="info-details">
              <p className=" text-lg ">{data.data?.userName}</p>
              <p className=" gen ">{data.data?.gender}</p>
              <div>
                <button
                  className={` ${
                    youFollow
                      ? "bg-indigo-700 text-white"
                      :  !darkTheme ?"text-slate-300 border-slate-300" : " text-indigo-700 border-indigo-700  "
                  } w-[10vw]  border-[1px] rounded-md mt-3 py-1  `}
                  onClick={handleFollow}
                >
                  {followingYou ? followingStatus : "follow back"}
                </button>

                <button
                  onClick={handleMessage}
                  className="text-white , bg-indigo-700 ml-5 px-3 py-1 rounded-md "
                >
                  message
                </button>
              </div>
            </div>
            <div className="mt-3">
              <span
                className="self-center mx-[4vw]"
                onClick={() => setFollwing(!following)}
              >
                {data.data?.following.length || 0} following
              </span>
              <span
                className="self-center mx-[4vw]"
                onClick={() => setFollwing(!following)}
              >
                {" "}
                {followers || 0} followers
              </span>
            </div>
            <div className={!following ? "hidden" : " "}>
              <Followings id={data.data?._id} />
            </div>
          </div>
        </div>
        <p className={`${!darkTheme ?'':''} my-2`}>About YOU :</p>
        <div className={` ${!darkTheme ?'bg-indigo-900 text-slate-300':''} profile-about`}>
          <p>{data.data?.about}</p>
        </div>
        <div className={` ${!darkTheme ?'text-slate-300':''} divider text-black `}>Posts</div>
        <UserPost id={data.data?._id} />
      </div>
    </>
  );
}

export default UserWholeInfo;
