import React, {useContext, useState} from 'react'
import "./style.css"
import { UseSocketContext } from '../../hooks/socketContext'
import { FaAngleDoubleRight } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';


function User_info(data ) {

  const navigate = useNavigate();
  const {onlineUsers   }  = UseSocketContext();
  const is_online = onlineUsers.find( (u)=>u.includes(data.data._id));
  const pfp =    data.data.profilePic || "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg";
  localStorage.setItem('lastChackedUser' , data.data._id )
  return ( <>
  
  <div className={`profile_your `}>
    <div onClick={()=> navigate(`/chat/profile/${data?.data?._id}`)} className='absolute right-0 m-2 flex justify-center text-indigo-800 ' >see more <FaAngleDoubleRight className='self-center mt-1 ml-1' /> </div>
    <div className="profile-info bg-white">
    <div  className= {`avatar self-center ${ is_online ? "online" : ""}`} >
    <div className="w-28 h-28 contact-img rounded-full">
      <img src={pfp} />
    </div>

  </div >
      <div className="divider px-3"></div>
      <div className="info">
       <div className='info-details flex flex-row'>
        <div> <p>UserName :</p>
        <p className='userName inline'>{data.data.userName}</p></div>
       
        <div className="divider px-3"></div>

        <p className=' gen '>{data.data.gender}</p>
  
       </div>
      </div>
      <div className="divider px-3"></div>
    <h3 className='px-3'>About YOU :</h3>
    <div className="profile-about">
    <p>{data.data.about}</p>
    </div>
   
</div>
 
</div>
    </>

  )
}

export default User_info
