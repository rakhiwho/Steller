// src/hooks/useVideoChat.js

import { useContext, useEffect, useRef, useState } from "react";
import io from "socket.io-client";
 
import { context } from "./Context";
 
import useConversation from "./useconversation";
 
const SOCKET_SERVER_URL = import.meta.env.VITE_BACKEND_URL; // Replace with your server URL

const useVideoChat = (currentUser, targetUserId ) => {
   const {isCalling , setIsCalling} = useContext(context);
  const [callIncoming, setCallIncoming] = useState(false);
  const [callerData, setCallerData] = useState(null);
  const currentUserId  = !currentUser ? null :currentUser;
 const {setLocalStream , localStream} = useConversation();
 
  const socketRef = useRef(null);
  const peerConnectionRef = useRef(null);
   
  const[ targetUser , setTargetUser] = useState();
  //const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
 const [picked , setPicked] = useState(false)
 
  // Initialize Socket.IO and get user media
  useEffect(() => {
  setTargetUser(targetUserId === null ? localStorage.getItem('selectedUser'): targetUserId) 
    // Initialize Socket.IO client
    socketRef.current = io(SOCKET_SERVER_URL);

    // Join the current user's room
    socketRef.current.emit("join", currentUserId);

    
    // Listen for incoming call offers
    socketRef.current.on("callIncoming", (data) => {
      setCallIncoming(true);
      setCallerData(data);
      console.log("Incoming call data:", data);
    });

    // Listen for call acceptance
    socketRef.current.on("callAccepted", (signal) => {
      peerConnectionRef.current
        .setRemoteDescription(new RTCSessionDescription(signal))
        .catch((err) =>
          console.error("Error setting remote description:", err)
        );
        setPicked(true)
        localStorage.setItem('picked' ,  'true')

       

    // Listen for ICE candidates
    socketRef.current.on("ice-candidate", (  candidate) => {
      if (peerConnectionRef.current) {
        peerConnectionRef.current
          .addIceCandidate(new RTCIceCandidate(candidate))
          .catch((err) =>
            console.error("Error adding received ICE candidate:", err)
          );
      }
    });

    // Listen for call termination
    socketRef.current.on("endCall", () => {
      endCall();
    });

    // Cleanup on unmount
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
      if (peerConnectionRef.current) {
        peerConnectionRef.current.close();
      }
      if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
      }
      if (remoteStream) {
        remoteStream.getTracks().forEach(track => track.stop());
      }
    };
});
  }, [currentUserId]);

  // Function to initiate a call
  const initiateCall = () => {
  
    setIsCalling(true);
    localStorage.setItem('calling' , "true")
    // Request access to the camera and microphone
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setLocalStream(stream); // Store the local stream in state
        console.log(localStream)
        // Initialize PeerConnection after getting the stream
        peerConnectionRef.current = new RTCPeerConnection({
          iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
        });
  
        // Add local tracks to peer connection
        stream.getTracks().forEach((track) => {
          peerConnectionRef.current.addTrack(track, stream);
        });
  
        // Handle remote stream
        peerConnectionRef.current.ontrack = (event) => {
          const [remoteStream] = event.streams;
          setRemoteStream(remoteStream);
        };
  
        // Handle ICE candidates
        peerConnectionRef.current.onicecandidate = (event) => {
          if (event.candidate) {
            socketRef.current.emit("ice-candidate", {
              to: targetUserId,
              candidate: event.candidate,
            });
          }
        };
  
        // Create and send offer
        peerConnectionRef.current
          .createOffer()
          .then((offer) => peerConnectionRef.current.setLocalDescription(offer))
          .then(() => {
            socketRef.current.emit("offer", {
              userToCall: targetUser,
              signal: peerConnectionRef.current.localDescription,
              from: currentUserId,
              name: "you", // Optional: Add caller's name
            });
            
          })
          .catch((error) => console.error("Error creating offer:", error));
      })
      .catch((error) => {
        console.error("Error accessing media devices.", error);
      });
  };
  
  // Function to accept an incoming call
  const acceptCall = () => {
    setCallIncoming(false);
    peerConnectionRef.current = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });

    // Add local tracks to peer connection
    if (localStream) {
      localStream.getTracks().forEach((track) => {
        peerConnectionRef.current.addTrack(track, localStream);
      });
    } else {
      console.error("No local stream available.");
      return;
    }

    // Handle remote stream
    peerConnectionRef.current.ontrack = (event) => {
      const [stream] = event.streams;
      setRemoteStream(stream);
    };

    // Handle ICE candidates
    peerConnectionRef.current.onicecandidate = (event) => {
      if (event.candidate) {
        socketRef.current.emit("ice-candidate", {
          to: callerData.from,
          candidate: event.candidate,
        });
      }
    };

    // Set remote description and create answer
    peerConnectionRef.current
      .setRemoteDescription(new RTCSessionDescription(callerData.signal))
      .then(() => peerConnectionRef.current.createAnswer())
      .then((answer) => peerConnectionRef.current.setLocalDescription(answer))
      .then(() => {
        socketRef.current.emit("answer", {
          signal: peerConnectionRef.current.localDescription,
          to: callerData.from,
        });
    
      })
      .catch((error) => console.error("Error accepting call:", error));
  };

  // Function to end the call
  const endCall = () => {
 

    if (localStream) {
      // Stop all video/audio tracks to turn off the camera
      localStream.getTracks().forEach(track => track.stop());
      setLocalStream(null);
    }
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
      peerConnectionRef.current = null;
    }
 
    setIsCalling(false);
    setCallIncoming(false);
    setRemoteStream(null);
    socketRef.current.emit("endCall", { to: callerData?.from || targetUser });
  };
  
  return {
    initiateCall,
    acceptCall,
    endCall,
    localStream,
    remoteStream,
    isCalling,
    callIncoming,
    picked ,
    callerData,
    setPicked,
    targetUser
  };
};

export default useVideoChat;
