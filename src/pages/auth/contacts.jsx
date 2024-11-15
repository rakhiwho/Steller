import React, { useContext, useEffect, useState } from "react";
import { context } from "../../hooks/Context.jsx";
import useConversation from "../../hooks/useconversation";
import { AiFillCloseSquare } from "react-icons/ai";
import { UseSocketContext } from "../../hooks/socketContext.jsx";
import User_info from "../extras/friendprofies.jsx";
import useGetConversation from "../../hooks/useGetConversation.js";
import { useNavigate, useParams } from "react-router-dom";
import useGetUser_info from "../../hooks/useGetUser_info.js";
import UserInfo from "../../hooks/UserInfo.js";

export const Contact = ({ data }) => {
  const [visible, setVisible] = useState(false);
  const { id } = useParams();
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { onlineUsers } = UseSocketContext();
  const navigate = useNavigate();
 const {darkTheme}= useContext(context);
  const isSelected = id === data._id;
  const is_online = onlineUsers.includes(data._id);
  const pfp =
    data.profilePic ||
    "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg";
   
    const handleClick = () => {
      localStorage.setItem("selectedUser", data._id);
      navigate(`/chat/${data._id}`);
      setSelectedConversation(localStorage.getItem('selectedUser'));
   
  };

  return (
    <>
      <div
        onDoubleClick={() => setVisible(true)}
        className={`con-container  ${isSelected ? "bg-slate-300 text-indigo-950 font-medium " : ""} `}
        onClick={handleClick}
      >
        <div className={`avatar ${is_online ? "online" : ""}`}>
          <div className="w-10 contact-img rounded-full">
            <img src={pfp} />
          </div>
        </div>
        <p>{data?.userName}</p>
      </div>

      <div className="divider m-0 px-1"></div>

      <div className={`${!visible ? "hidden" : ""} poping_up  right-0 `}>
        <button onClick={() => setVisible(false)}>
          <AiFillCloseSquare className="text-2xl text-indigo-800 " />
        </button>
        <User_info data={data} />
      </div>
    </>
  );
};

export default Contact;
