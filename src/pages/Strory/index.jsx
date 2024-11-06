import React, {useEffect , useState , useContext} from 'react'
import './style.css'
import { context } from '../../hooks/Context';
import useGetUser_info from '../../hooks/useGetUser_info'
import StoryLayout from './StoryLayout';
import useGetConversation from '../../hooks/useGetConversation';

import { IoMdAddCircleOutline } from "react-icons/io";
import Storypop from '../Profile/Storypop';
import useGet_Story from '../../hooks/useGet_Story';
import useGetFriends from '../../hooks/useGetFriends';

function Story() {

  const {  setVisibleStory , visibleStory} = useContext(context);
  const {data} = useGetUser_info();
 const {friends} = useGetFriends();
   


 
  return (
    <>
    <div className= {`story ${visibleStory ? "blur-sm" : ""} `}>
   
<div className="story_header"><><span className='content-center'>Your Story </span></><IoMdAddCircleOutline onClick={()=> setVisibleStory(!visibleStory)} className='  m-1 text-xl' /></div>

<div className="">
 
  { data.story != undefined  ?   <StoryLayout data ={data} /> :  <p className='ml-2 mb-2'>you have not posted any status ,  ye share now !</p>  }
  
  </div>
<div className="story_header">others</div>
<div className="friends_stories">
  {
  friends.map( (conv)=>( <StoryLayout  key={conv._id} data={conv} />))
  }
</div>
 
    </div>
    <div className={`PopUP_for_story z-0 absolute top-[30vh] right-[40vw] border-x-2 border-indigo-400 rounded-md bg-gray-200 h-fit w-96 p-3 my-0 ${!visibleStory ? "hidden" :""}`}>
      <Storypop/>
       </div>
    </>
  )
}

export default Story
