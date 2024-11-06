import React , {useContext} from 'react'
import { context } from '../../hooks/Context';
function Games() {
  const {darkTheme} = useContext(context);
  return (
    <div className={`${!darkTheme ?'bg-indigo-950 text-slate-300':''}  absolute m-0 left-[3.2vw]  h-screen  overflow-x-scroll lg:w-[96.5vw]  md:w-[95vw] w-[94.5vw] pl-6 py-0 user_post   `}
      >
    <div className='ml-8 pt-5'>in proccess...</div>
    </div>
  )
}

export default Games
