import React, { useContext, useState } from 'react'
import Getfollowing from '../../../hooks/Getfollowing'
import Member from './member';
import { context } from '../../../hooks/Context';

function Followings({id}) {
   
    const {data , loading} = Getfollowing(id);
     const {darkTheme } = useContext(context);
      const [followingset, setFollwingset] = useState(true)
  
  return (
    <div className={` ${!darkTheme ?'bg-indigo-900 text-slate-300':''} div2 h-[88vh] w-[40vw]   fixed right-0 top-[12%] `}>
     <div className='flex flex-row content-center p-2 mt-4 text-white bg-indigo-800'>
      <p onClick={()=>setFollwingset(true)} className={followingset ?"text-indigo-800 bg-white p-1 rounded-md self-center pl-[5vw] flex-1 " :" flex-1 pl-[5.5vw] " }>followings</p>
      
      <p onClick={()=>setFollwingset(false)} className={!followingset ?"text-indigo-800 bg-white p-1 rounded-md flex-1 pl-[5vw]   " :"flex-1 pl-[5.5vw]" }>followers</p>   
     </div>
     <div className="divider m-0"></div>
     <div>
     { !loading && followingset ?
       data?.following.map((f)=>(<div key={f._id}>
        <Member data={f}   />
      </div>)) : data?.followers.map((f)=>(<div key={f._id}>
        <Member data={f}   />
      </div>)) 
      }
      {
        data?.followers.length ===0 && !followingset && <span className=' ml-[12vw]'>no followers</span>
      }
      {
        data?.following.length === 0 && followingset &&<span className=' ml-[12vw]'>no following</span>
      }
     </div>
    </div>
  )
}

export default Followings
