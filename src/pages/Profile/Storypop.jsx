import React, { useContext, useState } from 'react'
import { MdFileDownloadDone } from "react-icons/md";
import Use_postStory from '../../hooks/use_postStory';
import { context } from '../../hooks/Context';
import { MdOutlineCancel } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
function Storypop() {
   const [content , setContent]= useState("")
   const [caption , setCaption] = useState("")
    const { setVisibleStory} = useContext(context)
    const { add_Story } = Use_postStory(content , caption);
    const navigate =  useNavigate();


    const handleSubmit = async (e)=>{

      e.preventDefault(); 
      try {
        if(!content) return;
     
        await add_Story(); 
      
        navigate("/story")
        location.reload();
     setVisibleStory(false)
      } catch (error) {
        console.log(error)
      }
      
    }
   
  return (
    <div >
        <form onSubmit={handleSubmit} >
        <h3 className='my-2 text-white-400'>Write Story here :</h3>

<div className="input_for_story">
  <input value={content} onChange={(e)=>setContent(e.target.value)} className='h-16 max-h-fit w-80 text-md px-4 py-3 'type="text" name="" id="" />
</div>
     <button 
    type='submit' className='m-3 bg-white bg-opacity-100  py-2 px-1 text-md rounded-xl text-violet-700'
      ><MdFileDownloadDone />
      </button>
  <button onClick={()=>{setVisibleStory(false); setContent("")}} className='m-3 bg-white  bg-opacity-100  py-2 px-1 text-md rounded-xl text-violet-700'><MdOutlineCancel /></button>
        </form>
     
    </div>
  )
}

export default Storypop
