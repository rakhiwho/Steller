import React, { useContext, useState } from "react";
import useGetConversation from "../../hooks/useGetConversation.js";
import useConversation from "../../hooks/useconversation.js";
import useGetFriends from "../../hooks/useGetFriends.js";
import { context } from "../../hooks/Context.jsx";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaSearch } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import Contact from "./contacts";
import "./style.css";
import { useNavigate } from "react-router-dom";

function SideBar() {
  const [search, setSearch] = useState("");
  const { conversation } = useGetConversation();
  const { setSelectedConversation } = useConversation();
  const { friends } = useGetFriends();
  const {
    blur,
    darkTheme,
    advanced,
    setAdvanced,
    visibleStory,
    setVisibleStory,
  } = useContext(context);
  const [searching, setSearching ]= useState(false);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    if (search.length < 3) {
      alert("search should be longer than 3 character!");
    }
    const conversations = conversation.find((c) =>
      c.userName.toLowerCase().includes(search.toLowerCase())
    );

    if (conversations) {
      setSelectedConversation(conversations);
      setSearch("");
    } else {
      alert("no user found");
    }
  };

  return (
    <div
      className={`${blur && "blur-sm"} ${
        !darkTheme ? "bg-indigo-900 text-slate-300" : ""
      } h-[93vh]  absolute    lg:w-[23vw] w-[30vw]   `}
    >
      {/* .............................................search input............................................... */}

      <div className="searchInput  ">
        <div className="pt-3 flex flex-row content-center justify-around">
          {visibleStory ? (
            <RxCross1
              className={` ${
                !darkTheme ? "text-slate-300" : ""
              } self-center mt-[1vh] text-indigo-900 `}
              onClick={() => {
                setVisibleStory(false);
                setSearching(false);
              }}
            />
          ) : (
            <GiHamburgerMenu
              className={` ${
                !darkTheme ? "text-slate-300" : ""
              } self-center mt-[1vh] text-indigo-900 `}
              onClick={() => setVisibleStory(true)}
            />
          )}

          <form
            className="flex items-center gap-2 mt-0"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="search"
              className={` ${
                !darkTheme ? "bg-indigo-900 border-slate-300 " : ""
              } input input-bordered py-0 h-9 rounded-full`}
            />
            <button
              className={`${
                !darkTheme ? "border-slate-300" : ""
              } rounded-full border-[1px] text-indigo-800 hover:text-white hover:bg-indigo-800 border-indigo-700 p-[6px] `}
            >
              <FaSearch
                className={`${!darkTheme ? "text-slate-300" : ""} h-4 w-4 `}
              />
            </button>
          </form>
        </div>

        {visibleStory && (
          <div
            className={` ${
              !darkTheme ? "bg-indigo-700 text-slate-300 " : "bg-white"
            }  moreOpt-message shadow-lg `}
          >
            <div className="divider m-0 p-0"></div>
            <li onClick={() => navigate("/explore")}>explore </li>
            <div className="divider m-0"></div>
            <li onClick={() => navigate("/story")}>Status</li>
            <div className="divider m-0"></div>
            <li onClick={() => navigate("/")}>Home</li>
            <div className="divider m-0"></div>
            <li onClick={() => navigate("/add_post")}>post</li>
          </div>
        )}
      </div>

      {/* ........................................................................ */}
      <div className="divider m-0 mt-2 px-1"></div>
      <div className="sideBar-contacts">
        {friends?.map((data) => (
          <div key={data?._id}>
            <Contact data={data} {...data} />
          </div>
        ))}
        {friends?.length === 0 && (
          <span
            className={`  ml-[5vw] w-[20vw] mt-[40vh] font-medium  `}
            onClick={() => navigate("/explore/search")}
          >
            🗣 - no DM yet , <br className="ml-[5vw]"></br> go to search to find
            your friend{" "}
          </span>
        )}
      </div>
    </div>
  );
}

export default SideBar;
