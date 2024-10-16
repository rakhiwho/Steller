import React, { useState } from 'react'
import  UserInfo  from '../../../hooks/UserInfo.js'
import { FaRegHeart } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa6";
import AddLike from '../../../hooks/addLike';



function Comment({comment}) {

    const {data , loading}= UserInfo(comment.commentedBy);
    const [liked , setLiked] = useState(comment?.likedBy?.includes(localStorage.getItem("userID")))
 
    const {Like , data : commentedData} =    AddLike('' ,comment?._id);
    const [likes , setLikes]= useState(comment?.likes);
   
    const likePost = async ()=>{
     
    setLiked(!liked) 
     
      liked ? setLikes(likes -1) : setLikes(likes +1)
         if(data?._id){
       await Like();

       }else{
           console.log("something went wrong")
         }
   }

  return (
    <>
    {
      loading && <> loading... </>
    }

    {
      !loading && <div className='grid  sm:grid-cols-[3fr_7fr_1fr] md:grid-cols-[2fr_7fr_1fr] lg:grid-cols-[1fr_7fr_1fr] grid-cols-[1fr_7fr_1fr] p-2 rounded-lg hover:shadow-md '>
      <div className={`h-fit w-fit`}  >
        <img className={`h-14 img_div rounded-full`} src={data?.profilePic} alt="pfp" />
      </div>
      <div className='  ml-2 ' >
        <p className='userName text-sm bg-transparent m-0 font-bold' >{data?.userName}</p>
        <h2 className='text-sm bg-transparent m-0 font-medium'>{comment?.comment}</h2>
       </div>

   <div className=" flex flex-col  likes ml-11 bg-transparent text-xs  " >

     {liked ?<><FaHeart onClick={likePost} className='text-pink-600' /> <p className='text-black ml-0.5 font-medium' >{likes}</p></>:
           <><FaRegHeart onClick={likePost}  className='text-pink-600' />  <p className='text-black ml-0.5 font-medium' >{likes}</p></>}
          
   </div>
    </div>
    }
    <div className="divider m-1"> </div>
    
    </>
  )
}

export default Comment
