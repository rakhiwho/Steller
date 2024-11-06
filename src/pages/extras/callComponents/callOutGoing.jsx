import React, { useContext } from "react";
import useVideoChat from "../../../hooks/callsystem";
import { useNavigate, useParams } from "react-router-dom";
import UserInfo from "../../../hooks/UserInfo";
import { context } from "../../../hooks/Context";
import { FcEndCall } from "react-icons/fc";
import { BiSolidPhoneCall } from "react-icons/bi";


function CallOutGoing() {
  const {   pfp } = useContext(context);
  const { id } = useParams();
 const navigate = useNavigate();
  const { data, loading } = UserInfo(localStorage.getItem("userID"));
  const {
    initiateCall,
    acceptCall,
    endCall,

    remoteStream,
 
    callIncoming,
    callerData,
    picked,
    targetUser,
    setPicked,
    isCalling: calling,
  } = useVideoChat(
    localStorage.getItem("userID"),
    localStorage.getItem("selectedCoversation")
  );
  const endCallON = () => {
    localStorage.setItem("calling", null);
    setIsCalling(false);
    console.log("sjusd");
    window.location.reload();
  };
   
  return (
    <>
      {calling && (
        <div className="fixed z-[100] w-[90vw] left-[5vw] top-[2vh] p-[1vh] rounded-md border-x-8 border-green-400 bg-slate-600">
          {!loading && (
            <div className="text-white flex flex-row content-between">
              <div className="h-[4vh] rounded-full mr-4 overflow-hidden w-[4vh]">
                <img
                  className="h-[5vh] w-[5vh]"
                  src={data?.profilePic || pfp}
                  alt="pfp"
                />
              </div>
              <p className="flex-1">{data?.userName}</p>
              <p className="flex-2">outgoing call...</p>
              <button className="mx-[1vw]" onClick={endCall}>
                <FcEndCall onClick={endCallON} /> 

              </button>
            </div>
          )}
          {loading && <>loadin info ...</>}
        </div>
      )}
 
      
    </>
  );
}

export default CallOutGoing;
