import React, { useState } from "react";
import useVideoChat from "../../hooks/callsystem";

function VideoPage() {
  const {
    endCall,
    acceptCall,
    initiateCall,
    localStream,
    remoteStream,
    isCalling,
    callIncoming,
  } = useVideoChat({});
  const [mute, setMute] = useState(false);
  return (
    <div>
      <div>
        {localVideo ? (
          <video ref={localVideo} autoPlay muted style={{ width: "300px" }} />
        ) : (
          <span>connecting...</span>
        )}
        <video ref={remoteVideo} autoPlay style={{ width: "300px" }} />
      </div>
      {isCalling && <button onClick={endCall}>End Call</button>}
    </div>
  );
}

export default VideoPage;
