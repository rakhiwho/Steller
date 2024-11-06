import React, { useContext } from 'react'
import { context } from '../../hooks/Context'
import { RiSparkling2Fill } from "react-icons/ri";
function Additional() {
  const {darkTheme} = useContext(context);
  return (
    <div className={`${!darkTheme ?'bg-indigo-950 text-slate-300':''}  lg:fixed lg:left-[3.3vw] h-[92.8vh] w-[95vw] lg:w-[98vw] p-10 `}>
    <div className=' capitalize font-medium ' >thanks for visiting my web <RiSparkling2Fill  className='text-pink-600 inline size-6'/> : </div>
    <div className='my-3 ' >there will be new features in  near future</div>
    </div>
  )
}

export default Additional
