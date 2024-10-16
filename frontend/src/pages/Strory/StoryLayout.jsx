import React, {useState} from 'react'
import { UseSocketContext } from '../../hooks/socketContext';
import useGet_Story from '../../hooks/useGet_Story';
import { MdDeleteOutline } from "react-icons/md";
import useDelete_user from '../../hooks/useDelete_user';


function StoryLayout(data ) {

//console.log(data.data._id)
    const { delete_Story} = useDelete_user();
  const { onlineUsers} = UseSocketContext();
  const is_online = onlineUsers.find( (u)=> u.includes(data.data._id))
  const pfp = data.data.profilePic || "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg";
  const [deleting , setDeleting] = useState(false);
 
  const {story} = useGet_Story(data.data._id);
   
  const deleteMethod = async ()=>{
   await  delete_Story();
   console.log(" deleted story ")
   setDeleting(false)
  location.reload();
  }

if(!data.data.story){
  return;
}
  return (

    <>
    <div className={`yourStory ${deleting ? "blur-sm" : ""} `}>

      
    {story?.content && <> <div  className= {`avatar self-center ${ is_online ? "online" : ""}`} >
      <div className="w-16 h-16 contact-img rounded-full">
        <img src={pfp}  alt=""/> 
    
      </div>
          
      </div>
     
    <div className='story_content'>
      <span className='content-center text-violet-900 text-xl'> {story?.content}</span>
   
    <p className='story-userName pr-3'>{data.data.userName}</p>
    </div>
    { data.data._id === localStorage.getItem('userID') &&     <div onClick={()=>setDeleting(true)} className=' content-center w-12 ml-3 text-violet-900'><MdDeleteOutline /></div>}
 </>}
   
     {
       !story?.content  && <button className="btn">
       <span className="loading loading-spinner"></span>
       loading
     </button> 
     }
    
     
     
    </div>
    <div  role="alertdialog" className= {` ${!deleting ? "hidden" : ""} absolute w-80 border-y-2 border-violet-600  alert my-12 align-middle  `}>

<span> Delete Story ?</span>
<div>
  <button onClick={()=>setDeleting(false) } className="btn btn-sm">nope</button>
  <button onClick={deleteMethod} className="btn btn-sm bg-indigo-700 text-blue-900 rounded-xl bg-opacity-50">Yup</button>
</div>
</div>  
    </>

  )
}

export default StoryLayout
