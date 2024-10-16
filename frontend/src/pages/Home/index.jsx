import React,{useContext} from 'react'
import './style.css'
import SideBar from './sideBar';
import { useCookies } from 'react-cookie';
 
 
import { Outlet } from 'react-router-dom';

function Home() {

  const [cookie ,] = useCookies(['access_token'])


  if(cookie.access_token){
  return (
    <>
    <div className='h-[]'>
      
  <SideBar/>
    </div>
    <div className="render_page">
    <Outlet/>
    </div>
    </>
  )
}else{
  <>
  </>
}
}

export default Home
