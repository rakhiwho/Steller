import React, { useEffect,useContext , useState } from 'react'
import { IoIosSearch } from "react-icons/io";
import { CiBrightnessDown } from "react-icons/ci";
import GetExplorePost from '../../hooks/GetExplorePost';
import PostLayout from './post/postLayout';
import { useNavigate } from 'react-router-dom';
 import { context } from '../../hooks/Context';


function Explore() {
  const {   data , loading}=  GetExplorePost();
  const navigate = useNavigate();
  const {darkTheme} = useContext(context)
  return (
   <>
   <div className={` ${!darkTheme ?' absolute top-[7.4%] bg-indigo-900 text-slate-300':''} absolute m-0 left-[3.2vw]  h-screen  overflow-x-scroll lg:w-[96.5vw]  md:w-[95vw] w-[94.5vw] pl-6 py-0 user_post   `}
      >
   <div className={` ${!darkTheme ?' bg-indigo-900 text-slate-300':''} flex flex-row justify-between fixed pt-3  z-[99] h-fit  content-center w-[80vw] text-xl text-indigo-900 `}
        >
    <button className=' ml-4 text-white rounded-full bg-indigo-700 p-2 mr-2'><CiBrightnessDown className='size-4' /></button> 
     <p className='flex-1 m  text-xl '>Explore</p>
     <button onClick={()=>navigate('/explore/search')} className=' mx-3 text-white rounded-full bg-indigo-700 p-2'><IoIosSearch/></button>
   </div>
   <div className="divider m-0 w-[88vw]"></div>
 
   <div className='flex   flex-row flex-wrap justify-between m-0'>
   {
 
 Array.isArray(data) && !loading
   &&
    data.map((data)=>(
     <div key={data._id}>
 
 <PostLayout  data={data}    />
     </div>)
    )  }
 
   </div>
   </div>
   </>
  )
}

export default Explore
