import React, { useContext } from "react";

import useConversation from "../../hooks/useconversation";

import { UseSocketContext } from "../../hooks/socketContext.jsx";
import { useNavigate } from "react-router-dom";
import { context } from "../../hooks/Context.jsx";

function Searchres(conversations) {
  
  const navigate = useNavigate();
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { onlineUsers } = UseSocketContext();
  const isSelected = selectedConversation?._id === conversations._id;
  const is_online = onlineUsers.includes(conversations._id);
  console.log(conversations)
  const pfp =
    conversations.profilePic ||
    "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg";


  const handleClick = () => {
    setSelectedConversation(conversations);
    localStorage.setItem("search_user", conversations?._id);

    navigate(`/userProfile/${conversations?._id}`);
  };

  return (
    <>
      <div
        className={`flex flex-row content-center  ${
          isSelected ? "bg-indigo-100 text-indigo-950" : ""
        } w-full `}
        onClick={handleClick}
      >
        <div className={`avatar ${is_online ? "online" : ""}`}>
          <div className="w-[8vh] mr-3 contact-img rounded-full">
            <img src={pfp} />
          </div>
        </div>
       <p className="self-center">{conversations.userName}</p>
      </div>

      <div className="divider m-0 w-[100%] "></div>
    </>
  );
}

export default Searchres;
