import React, { useState, useRef, useEffect, useContext } from "react";
import { IoSend } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdCancel, MdDelete } from "react-icons/md";
import { IoIosVideocam, IoMdCall } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import Message from "./message";
import useConversation from "../../hooks/useconversation.js";
import useSendMessages from "../../hooks/useSendMessages.js";
import useGetMessages from "../../hooks/useGetMessages.js";
import useListenMessages from "../../hooks/useListenmessages";
import useGetUser_info from "../../hooks/useGetUser_info.js";
import UserInfo from "../../hooks/UserInfo.js";
import DeleteConvo from "../extras/deleteConvo.jsx";
import useVideoChat from "../../hooks/callsystem.js";
import { context } from "../../hooks/Context.jsx";
import { MdTipsAndUpdates } from "react-icons/md";
import { UseSocketContext } from "../../hooks/socketContext.jsx";
import  Picker  from '@emoji-mart/react';
import { MdEmojiEmotions } from "react-icons/md";
 

function ChatBox() {
  const { id } = useParams();
  const [message, setMessage] = useState("");
   const [useEmoji , setUseEmoji] =  useState(false)
  const { selectedConversation } = useConversation();
  const { sendMessages } = useSendMessages(id);
  const { fetchedMessage, loading } = useGetMessages(id);
  const { data, loading: userIDLoading } = useGetUser_info();
  const { darkTheme } = useContext(context);
  const { socket } = UseSocketContext();
  const navigate = useNavigate();

  const { data: userInfo, loading: userLoading } = UserInfo(id);
  const lastMessageRef = useRef();

  useListenMessages();

  // Ensure selectedConversation is available and pass correct ID
  const {
    endCall,
    acceptCall,
    initiateCall,
    isCalling: calling,
  } = useVideoChat(
    localStorage.getItem("userID"),
    selectedConversation ? selectedConversation._id : null
  );

  const {
    setIsvoiceCalling,
    isCalling,
    setAdvanced,
    setIsCalling,

    advanced,
    blur,
    setBlur,
    message: warning,
  } = useContext(context);

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [fetchedMessage]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message) return;
    try {
      await sendMessages(message);
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
      // Optionally show an error message to the user
    }
  };
 
  const handleInitiateCall = () => {
    // initiateCall();
    navigate(`/videoCall/${id}`);
  };

  return (
    <>
      <div
        className={`${blur ? "blur-lg" : ""} ${
          !darkTheme ? "bg-indigo-950" : "bg-slate-100"
        } absolute top-[0vh] left-[0vw]  flex flex-col w-[70vw] home-chat ml-[30vw] lg:ml-[23vw] lg:w-[77vw] `}
      >
        {!id ? (
          <span
            className={` ${
              !darkTheme ? "text-slate-300" : ""
            } mt-[40vh] ml-[25vw] font-bold capitalize`}
          >
            🧸no chat selected 💬
          </span>
        ) : (
          !userLoading && (
            <>
              {/* ---------------texts section----------- */}
              <div className="message w-[70vw] lg:w-[77vw] flex-grow">
                {/* ------------header---------- */}
                <div className="message-header mt-0 flex flex-row">
                  <p
                    className={`${
                      !darkTheme ? "text-slate-200" : "text-slate-700"
                    } message-header1 flex-1 mt-3 font-medium `}
                  >
                    with :{" "}
                    {selectedConversation?.userName ||
                      (!userLoading && userInfo?.userName)}
                  </p>
                  {userInfo?.story && (
                    <MdTipsAndUpdates
                      onClick={() => navigate("/story")}
                      className={` ${
                        !darkTheme ? "text-slate-300" : ""
                      } mt-3 mr-4`}
                    />
                  )}
                  <button
                    onClick={() => setAdvanced(!advanced)}
                    className=" self-center mr-3"
                  >
                    <BsThreeDotsVertical
                      className={` ${
                        !darkTheme ? "text-slate-300" : ""
                      } mt-3 mr-4`}
                    />
                  </button>

                  <div
                    className={` ${!darkTheme ? " " : ""} divider m-0 `}
                  ></div>
                  {/* .......advanced...... */}

                  <div
                    className={`${advanced ? "" : "hidden"}  ${
                      !darkTheme
                        ? "bg-indigo-700 text-slate-300 "
                        : "bg-slate-300"
                    } text-indigo-900 div1 flex flex-col  w-[20vw] h-fit p-1 rounded-md absolute top-[2vh] right-0 z-[99]`}
                  >
                    <MdCancel
                      onClick={() => setAdvanced(false)}
                      className="absolute right-2 top-2 cursor-pointer"
                    />
                    <div className="mt-6">
                      <button
                        onClick={() => setBlur(!blur)}
                        className="inline-flex items-center hover:text-white hover:bg-indigo-800 px-2 py-1 rounded"
                      >
                        <MdDelete className="mr-1" /> close DM
                      </button>
                      <div
                        className={` ${!darkTheme ? " " : ""} divider m-0 p-0`}
                      ></div>
                      <button
                        onClick={handleInitiateCall}
                        className="inline-flex items-center hover:text-white hover:bg-indigo-800 px-2 py-1 rounded mt-2"
                      >
                        <IoIosVideocam className="mr-1" /> start video call
                      </button>
                      <div className="divider m-0"></div>
                      <button
                        onClick={() => setIsvoiceCalling(true)}
                        className="inline-flex items-center hover:text-white hover:bg-indigo-800 px-2 py-1 rounded mt-2"
                      >
                        <IoMdCall className="mr-1" /> start voice call
                      </button>
                      <div className="divider m-0"></div>
                    </div>
                  </div>
                </div>
                {/* ------------messages---------- */}
                <div className="divider mt-0"></div>

                <div className="messages w-[70vw]  lg:w-[77vw] overflow-auto">
                  {!loading &&
                    fetchedMessage != undefined &&
                    fetchedMessage?.messages?.map((msg) => (
                      <div key={msg._id} ref={lastMessageRef}>
                        <Message message={msg} />
                      </div>
                    ))}

                  {/* .........loading......... */}
                  {loading && (
                    <button className="btn btn-square right-20 -loading bg-slate-100">
                      <span className="loading loading-spinner"></span>
                    </button>
                  )}

                  {fetchedMessage.length === 0 && !loading && (
                    <span
                      className={` ${
                        !darkTheme ? "text-slate-300" : ""
                      } ml-10 font-medium`}
                    >
                      hey!👋🏻 {!userLoading && data.userName} send a message to
                      start the conversation...🫣
                    </span>
                  )}
                </div>
              </div>

              {/* -------------------input section--------------- */}
              <div className="text-input">
                <form
                  onSubmit={handleSubmit}
                  className={` ${
                    !darkTheme ? "bg-indigo-900 text-slate-300" : ""
                  } input input-bordered w-[70vw] lg:w-[77vw] flex items-center gap-2 inp`}
                >
                  <button onClick={()=>setUseEmoji(!useEmoji)}  ><MdEmojiEmotions className={` ${!darkTheme ?'text-slate-300 ' :' text-indigo-950'} size-5`} /></button>
             { useEmoji &&    <Picker    onEmojiSelect={(emoji) => setMessage(message + emoji.native)} />}
                  <input
                    type="text"
                    className="grow"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                  />
                  <button
                    type="submit"
                    className={` ${
                      !darkTheme ? "bg-indigo-900 border-none" : ""
                    }      bg-white border-x-0 rounded-none`}
                  >
                    <IoSend
                      className={` ${
                        !darkTheme ? "bg-indigo-900 text-slate-200" : ""
                      } border-none `}
                    />
                  </button>
                </form>
              </div>
            </>
          )
        )}
      </div>

      {/* Delete Conversation Popup */}
      <div
        onClick={() => {
          setBlur(!blur);
          setAdvanced(!advanced);
        }}
        className={` z-100 fixed top-[40vh] left-[40vw] border-x-2 border-indigo-400 rounded-md bg-gray-200 h-fit w-fit p-3 ${
          blur ? "" : "hidden blur-0"
        }`}
      >
        <DeleteConvo
          className={`${!darkTheme ? "text-slate-200" : ""}`}
          id={fetchedMessage?._id}
        />
      </div>

      {/* Warning Message */}
      {warning && (
        <span className="text-xl text-white bg-blue-800 rounded-lg h-fit w-fit p-2 fixed z-[100] top-[20vh] right-[50vw]">
          {warning}
        </span>
      )}
    </>
  );
}

export default ChatBox;
