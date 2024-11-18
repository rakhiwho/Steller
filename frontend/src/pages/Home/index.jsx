import React,{useContext , useEffect} from 'react'
import './style.css'
import SideBar from './sideBar';
import { useCookies } from 'react-cookie';
 
 
import { Outlet, useNavigate } from 'react-router-dom';

function Home() {
 
  const [cookie ,] = useCookies(['access_token'])
 
   
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
 
}

export default Home
