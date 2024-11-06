import React, { useContext, useEffect, useState } from "react";
import "./style.css";
import useGetMessages from "../../hooks/useGetMessages";
import useConversation from "../../hooks/useconversation";
import useGetConversation from "../../hooks/useGetConversation";
import useDelete_message from "../../hooks/useDelete_message";
import { MdDelete } from "react-icons/md";
import { MdCancel } from "react-icons/md";
import UserInfo from "../../hooks/UserInfo";
import { useParams } from "react-router-dom";
import { context } from "../../hooks/Context";
function Message(message) {
  const {id} = useParams();
  const { selectedConversation } = useConversation();
  const {darkTheme} = useContext(context);
  const { delete_message } = useDelete_message(message.message._id);
  const from_me = message.message.senderID === localStorage.getItem("userID");
  const [deleting, setDeleting] = useState(false);
   const {data , loading} = UserInfo(id);
  const pfp =
    data?.profilePic ||
    "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg";

  const deleteMethod = async () => {
    await delete_message();
    console.log("deleted message successfully !");
  };
 
  {
    if (!from_me) {
      return (
        <>
          <div className="chat chat-start py-1">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img alt="Tailwind CSS chat bubble component" src={pfp} />
              </div>
            </div>
            <div className={`  ${!darkTheme? 'bg-slate-400 text-blue-950' : ''} text chat-bubble font-medium pb-0`}>{message.message.messages}</div>
            <div className="chat-footer opacity-50 text-xs flex h-1  gap-1 items-center"></div>
          </div>
        </>
      );
    }

    return (
      <>
        <div onClick={() => setDeleting(!deleting)} className="chat chat-end">
          <div className={` text font-medium chat-bubble bg-indigo-800 `}>
            {message.message.messages}
          </div>
          <div className="chat-footer opacity-50 text-xs flex  gap-1 items-center">
            {}
          </div>
          <div
            className={` ${
              !deleting ? "hidden" : ""
            } absolute left-10  align-middle w-48 m-0 `}
          >
            <div>
              <button onClick={deleteMethod} className="mr-3 m-0  ">
                <MdDelete className="text-indigo-900 text-xl self-center m-0" />
              </button>
              <button className="m-0" onClick={() => setDeleting(false)}>
                <MdCancel className="text-xl text-indigo-800" />
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Message;
