import React,{useContext , useEffect} from 'react'
import './style.css'
import SideBar from './sideBar';
import { useCookies } from 'react-cookie';
 
 
import { Outlet, useNavigate } from 'react-router-dom';

function Home() {
 const navigate = useNavigate();
  const [cookie ,] = useCookies(['access_token'])

  if( localStorage.getItem("userID")== -1){
    console.log("hshghsbc gxban rakhi")
    navigate("/login");
  }
 useEffect(()=>{
  if(localStorage.getItem("userID")== -1){
    navigate("/login");
  }
 }, [navigate ])
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
