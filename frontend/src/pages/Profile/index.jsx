import React, { useContext, useState, useEffect } from "react";
import "./style.css";
import { context } from "../../hooks/Context";
import useGetConversation from "../../hooks/useGetConversation";
import useGetUser_info from "../../hooks/useGetUser_info";
import { UseSocketContext } from "../../hooks/socketContext";
import Storypop from "./Storypop";
import useDelete_user from "../../hooks/useDelete_user";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import UserPost from "./UserPost";
import { BsThreeDotsVertical } from "react-icons/bs";
import AdvancedSetttings from "./advancedSetttings";
import Followings from "../extras/followings/followings";
import { ReadMore } from "../extras/ReadMore";
import Loading from "../extras/loading";

function Index() {
  const navigate = useNavigate();
  const [, setCookies] = useCookies(["access_token"]);
  const {
    defaultPfp,
    darkTheme,
    setAdvanced,
    advanced,
    setVisibleStory,
    visibleStory,
  } = useContext(context);
  const { data, loading } = useGetUser_info();
  const { onlineUsers } = UseSocketContext();
  const [deleting, setDeleting] = useState(false);
  const { delete_user } = useDelete_user();
  const pfp = data.profilePic || defaultPfp;
  const is_online = onlineUsers.find((u) => u.includes(data._id));
  const [following, setFollwing] = useState(false);

  const deleteMethod = async () => {
    await delete_user();
    navigate("/");
    localStorage.clear();
    setCookies("access_token", null);
   
  };
   
  return (
    <div
      className={`${!darkTheme ? "gradient" : ""} fixed w-full overflow-x-scroll  p-[3vh]  h-screen `}
    >
      { loading && (
        <div
          className={` ${
            !darkTheme ? " text-slate-300" : ""
          } fixed top-[51%] lg:left-[33%] left-[35%] `}
        >
          {" "}
          <p className="text-2xl inline self-center ">please wait a moment </p>
          <span className=" fixed top-[52%] lg:left-[48%] left-[65%]  size-9 mx-2  p-0 self-center loading loading-dots loading-xs"></span>{" "}
        </div>
      )}

      {data.userName && (
        <div>
          <div
            className={`profile ${visibleStory || deleting ? "blur-sm" : ""} ${
              !darkTheme ? "bg-indigo-950 text-slate-300" : ""
            }  `}
          >
            <div
              className={`  profile-info relative  ${
                !darkTheme ? "bg-indigo-900 text-slate-300" : ""
              }  `}
            >
              <div
                className={`avatar self-center ${is_online ? "online" : ""}  `}
              >
                <div className="w-28 h-28 contact-img rounded-full">
                  <img src={pfp} />
                </div>
              </div>

              <div className="divider px-3"></div>
              <div className="info">
                <div className="info-details">
                  <p className=" text-lg ">{data.userName}</p>
                  <p className=" gen ">{data.gender}</p>
                </div>

                {/* story popup............. */}

                <div className="edit-btn flex flex-row content-center">
                  <button onClick={() => setVisibleStory(true)}>
                    add status
                  </button>
                  {/* following......... */}
                  <span
                    className="self-center mx-[4vw]"
                    onClick={() => setFollwing(!following)}
                  >
                    {" "}
                    {data?.following.length} following
                  </span>
                  <span
                    className="self-center mx-[4vw]"
                    onClick={() => setFollwing(!following)}
                  >
                    {" "}
                    {data?.follower?.length || 0} followers
                  </span>
                  <BsThreeDotsVertical
                    onClick={() => setAdvanced(!advanced)}
                    className="flex-1 self-center mt-2"
                  />
                  <div className="absolute right-0 top-0 ">
                    {advanced && (
                      <AdvancedSetttings
                        privacy={data?.privacy?.postVisibility}
                      />
                    )}
                  </div>
                </div>

                {/* ............. */}
              </div>
            </div>

            <p className={`${!darkTheme ? " " : ""} my-3`}>About YOU :</p>
            <div
              className={` ${
                !darkTheme ? "bg-indigo-900 text-slate-300" : ""
              } profile-about`}
            >
              <p>
                {" "}
                <ReadMore
                  text={data?.about}
                  maxLength={12}
                  textlength={data?.about.length}
                />
              </p>
            </div>
            <div className={`  ${ !darkTheme ? '':''} divider p-0  `}   >
              <span className="inline"> Posts</span>
            </div>

            <UserPost id={data?._id} />

            <button
              onClick={() => setDeleting(true)}
              className={` ${!darkTheme ?'text-slate-300':'text-blue-900'} text-slate-300  w-fit my-4 border-2  p-3 
    bg-indigo-700  rounded-2xl 
    bg-opacity-50 `}
            >
              delete Account
            </button>
          </div>

          {/*.................... pop up.................. */}

          <div
            role="alertdialog"
            className={` ${
              !deleting ? "hidden" : ""
            } alert my-12 align-middle fixed top-[40%] w-[50%] flex flex-col right-[22%]  `}
          >
            <span> are you sure you want to delete your account ?</span>
            <div>
              <button onClick={() => setDeleting(false)} className="btn btn-sm">
                nope
              </button>
              <button
                onClick={deleteMethod}
                className="btn btn-sm bg-indigo-700
             text-blue-900 rounded-xl bg-opacity-50"
              >
                Yup
              </button>
            </div>
          </div>
          <div
            className={`PopUP_for_story z-0 fixed  lg:right-[40%] right-[22%] top-[35%]    border-x-2
       border-indigo-800 rounded-md  bg-violet-200 h-fit w-96 p-3 my-0 
       ${!visibleStory ? "hidden" : ""}`}
          >
            <Storypop />
          </div>

          {/* ................................................ */}
          <div className={!following ? "hidden" : " "}>
            <Followings id={data?._id} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Index;
