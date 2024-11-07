// src/hooks/callsystem.js

import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

const SOCKET_SERVER_URL =  import.meta.env.VITE_BACKEND_URL; // Replace with your server URL

const useVoiceCallSystem = (currentUserId, targetUserId, isVideoCall = true) => {
  const [isvoiceCalling, setIsvoiceCalling] = useState(false);
  const [callIncoming, setCallIncoming] = useState(false);
  const [callerData, setCallerData] = useState(null);

  const socketRef = useRef(null);
  const peerConnectionRef = useRef(null);
 const [isCalling , setIsCalling] = useState(false)
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);

  const [socketConnected, setSocketConnected] = useState(false);
  // Initialize Socket.IO and handle events
  useEffect(() => {
    
    // Initialize Socket.IO client
    socketRef.current = io(SOCKET_SERVER_URL, {
      query: { userId: currentUserId },
    });
   
    socketRef.current.on("connect", () => {
      console.log("Socket connected:", socketRef.current.id);
      setSocketConnected(true);
    });

    // Join the user's room
    socketRef.current.emit("join", currentUserId);

    // Listen for incoming call offers
    socketRef.current.on("callIncoming", (data) => {
      setCallIncoming(true);
      setCallerData(data);
      console.log("Incoming call data:", data);
    });

    // Listen for call acceptance
    socketRef.current.on("receive-answer", (data) => {
      if (peerConnectionRef.current) {
        peerConnectionRef.current
          .setRemoteDescription(new RTCSessionDescription(data.signal))
          .then(() => {
            console.log("Call has been picked up!");
          })
          .catch((err) =>
            console.error("Error setting remote description:", err)
          );
      }
    });

    // Listen for ICE candidates
    socketRef.current.on("ice-candidate", (candidate) => {
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
        localStream.getTracks().forEach((track) => track.stop());
      }
      if (remoteStream) {
        remoteStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [currentUserId]);

  // Request local media on initialization
  useEffect(() => {
    const mediaConstraints = isVideoCall
      ? { video: true, audio: true }
      : { video: false, audio: true };

    navigator.mediaDevices
      .getUserMedia(mediaConstraints)
      .then((stream) => {
        setLocalStream(stream);
      })
      .catch((error) => {
        console.error("Error accessing media devices.", error);
        alert(
          "Could not access camera or microphone. Please check your permissions."
        );
      });
  }, [isVideoCall]);

  const initiateCall = () => {
   setIsvoiceCalling(true);

       setIsCalling(true);
   
    // Request access to the camera and microphone
    navigator.mediaDevices
      .getUserMedia({ video: false, audio: true })
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
        // Create and send offer
        peerConnectionRef.current
          .createOffer()
          .then((offer) => peerConnectionRef.current.setLocalDescription(offer))
          .then(() => {
            socketRef.current.emit("offer", {
              userToCall: targetUserId,
              signal: peerConnectionRef.current.localDescription,
              from: currentUserId,
              name: "you", // Optional: Add caller's name
            });
            console.log(localStream)
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
    setIsvoiceCalling(true);

    peerConnectionRef.current = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });

    // Add local tracks based on call type
    if (localStream) {
      localStream.getTracks().forEach((track) => {
        peerConnectionRef.current.addTrack(track, localStream);
      });
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
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
      peerConnectionRef.current = null;
    }
    setIsvoiceCalling(false);
    setCallIncoming(false);
    setRemoteStream(null);
   setIsCalling(false)
    if (localStream) {
      localStream.getTracks().forEach((track) => track.stop());
      setLocalStream(null);
    }

    if (socketRef.current) {
      socketRef.current.emit("endCall", {
        to: callerData?.from || targetUserId,
      });
    }
    window.location.reload();
  };

  return {
    initiateCall,
    acceptCall,
    endCall,
    localStream,
    isCalling,
    remoteStream,
    isvoiceCalling,
    callIncoming,
    callerData, // Expose callerData if needed for UI
  };
};

export default useVoiceCallSystem;
