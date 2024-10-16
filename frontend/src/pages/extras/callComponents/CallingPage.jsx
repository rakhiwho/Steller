// src/components/VoiceCallPage.jsx

import React, { useRef, useEffect, useContext } from 'react';
import useVoiceCallSystem from '../../../hooks/useCall';
import { useParams } from 'react-router-dom';
import { context } from '../../../hooks/Context';
import { MdCancel } from "react-icons/md";
import { BiSolidPhoneCall } from "react-icons/bi";
import UserInfo from '../../../hooks/UserInfo';
import useConversation from '../../../hooks/useconversation';
import { FcEndCall } from "react-icons/fc";

const VoiceCallPage = () => {
  const { id } = useParams(); // The ID of the user you're calling
  const localAudioRef = useRef(null);
  const remoteAudioRef = useRef(null);
  const {isvoiceCalling , setIsvoiceCalling , pfp} = useContext(context);
 const { selectedConversation} = useConversation();
  const { 
    localStream, 
    remoteStream, 
    initiateCall, 
    acceptCall, 
    endCall,
    isCalling,
    callIncoming,
    callerData ,
  } = useVoiceCallSystem(
    localStorage.getItem("userID"),
    id,
    false // Indicate this is a voice call
  );
 
const {data , loading }=  UserInfo(selectedConversation)
  useEffect(() => {
    if (localAudioRef.current && localStream) {
      localAudioRef.current.srcObject = localStream;
    }

    if (remoteAudioRef.current && remoteStream) {
      remoteAudioRef.current.srcObject = remoteStream;
    }
  }, [localStream, remoteStream]);
  
  useEffect(()=>{
   if(!isvoiceCalling){
    endCall();
   }
  },[isvoiceCalling])
  console.log(isCalling)
  return (
    <>
     
   
  {  isvoiceCalling || callIncoming &&  <div className=" fixed  z-[100]  top-[2vh] left-[3vw] flex  flex-row  w-[90vw]  p-[1vh] rounded-md border-x-8 border-green-400 bg-slate-600" >
    <div className=" self-center h-[4vh] rounded-full mr-4 overflow-hidden w-[4vh]">
                <img
                  className="h-[5vh] w-[5vh]"
                  src={data?.profilePic || pfp}
                  alt="pfp"
                />
              </div>
      <h2 className="text-sm flex-1 self-center text-white "> {data?.userName || "User"}</h2>
      
      {/* Local Audio */}
    { isCalling || isvoiceCalling &&  <div className="local-audio mx-3 self-center">
     
        <audio ref={localAudioRef} autoPlay muted playsInline />
      </div>
      }
      {/* Remote Audio */}
      {remoteStream && <div className="remote-audio mb-4">
       
        <audio ref={remoteAudioRef} autoPlay playsInline />
      </div>
}
      {/* Call Controls */}
      <div className="call-controls flex gap-4">
       
        {callIncoming && <button onClick={acceptCall} className="btn btn-green">Accept Call</button>}
        {!isCalling && !callIncoming && (
          <button onClick={initiateCall} className=" text-white bg-green-700 rounded-full p-2 mr-2 self-center "> <  BiSolidPhoneCall className='size-5' onClick={initiateCall} /></button>
        )}
      { isCalling &&  <button  className=" text-white   rounded-full p-2 mr-2 self-center "><FcEndCall className='text-white size-5 self-center '  onClick={endCall} /></button>}
      </div>
        < MdCancel className='text-white size-5 self-center '  onClick={()=>setIsvoiceCalling(false)} />
        
    </div>}
 
    
    </>
  );
};

export default VoiceCallPage;
