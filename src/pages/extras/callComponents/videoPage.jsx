import React from "react";
import useVideoChat from "../../../hooks/callsystem";
import useConversation from "../../../hooks/useconversation";
import UserInfo from "../../../hooks/UserInfo";

function VideoPage() {
  const { selectedConversation, localStream } = useConversation();
  const {
    initiateCall,
    acceptCall,
    endCall,
    remoteStream,
    isCalling,
    callIncoming,
    callerData,
    picked,
    targetUser,
    setPicked,
  } = useVideoChat(localStorage.getItem("userId"), selectedConversation);
  const { data, loading } = UserInfo(selectedConversation);

  return (
    <div onLoad={initiateCall} className="flex flex-col">
      <div className=" flex flex-row justify-between ml-[4vw] mt-3">
        {/* Local Video */}
        <div className=" bg-indigo-950 w-[40vw] h-[70vh] overflow-hidden ">
          <h3 className="font-medium my-2 bg-white pl-3 ">You</h3>
          <video
            autoPlay
            muted
            playsInline
            ref={(video) => {
              if (video && localStream) {
                video.srcObject = localStream;
              }
            }}
            className=" h-full w-full object-cover "
          />
        </div>

        {/* Remote Video */}
        <div
          className={`w-[40vw] h-[70vh]    ${
            remoteStream ? "" : "bg-indigo-950"
          }  `}
        >
          {remoteStream && (
            <>
              {" "}
              <h3 className="font-medium my-2 bg-white p-3 ">
                {!loading && data?.userName}
              </h3>
              <video
                autoPlay
                playsInline
                ref={(video) => {
                  if (video && remoteStream) {
                    video.srcObject = remoteStream;
                  }
                }}
                className=" h-full w-full object-cover "
              />{" "}
            </>
          )}{" "}
          {!remoteStream && (
            <span className="text-white  w-[30vw] mx-[3vw] ">
              {isCalling
                ? "couldn't load the video... "
                : "aren't calling anyone yet ,make a call"}
            </span>
          )}
        </div>
      </div>

      {/* Call Controls */}
      <div style={{ marginTop: "20px" }}>
        {!isCalling && !callIncoming && (
          <button
            className="text-white text-2xl border-x-2 border-y-2 hover:border-green-900 hover:bg-white hover:text-green-900 bg-green-900 px-[1vw] py-[0.5vh] rounded-lg ml-[5vw] "
            onClick={initiateCall}
          >
            Call
          </button>
        )}

        {callIncoming && (
          <div>
            <p>Incoming call from : {callerData?.name || "Someone"}</p>
            <button
              onClick={acceptCall}
              className="text-white text-2xl border-x-2 border-y-2 hover:border-green-900 hover:bg-white hover:text-green-900 bg-green-900 px-[1vw] py-[0.5vh] rounded-lg ml-[5vw] "
            >
              Accept
            </button>
            <button
              onClick={endCall}
              className=" bg-red-900  text-white  text-2xl border-x-2 border-y-2 hover:border-red-900 hover:bg-white hover:text-red-900  px-[1vw] py-[0.5vh] rounded-lg ml-[5vw] "
            >
              Reject
            </button>
          </div>
        )}

        {isCalling && (
          <button
            onClick={endCall}
            className=" bg-red-900  text-white  text-2xl border-x-2 border-y-2 hover:border-red-900 hover:bg-white hover:text-red-900  px-[1vw] py-[0.5vh] rounded-lg ml-[5vw] "
          >
            End Call
          </button>
        )}
      </div>
    </div>
  );
}

export default VideoPage;
