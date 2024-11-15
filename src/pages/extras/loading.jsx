import React, { useContext } from 'react'
import { context } from '../../hooks/Context';

function Loading({text1, text}) {

  const {darkTheme} = useContext(context);
  return (
    <div className={`${!darkTheme ?'text-slate-300':''} flex flex-col`}>
      <div className={`   mt-[30vh] content-center lg:ml-[36vw] ml-[30vw] font-medium text-2xl  `}>
      <span>{text1} <br></br>{text}</span>

           <span className="  fixed top-[51%] lg:left-[53%] left-[55%]  size-9 mx-2  p-0  loading loading-dots loading-xs"></span>
     </div> 
    </div>
  )
}

export default Loading
