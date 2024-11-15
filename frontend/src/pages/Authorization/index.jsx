import React, { useContext } from 'react'
// import {BrowserRouter as Router, Route, Routes }  from 'react-router-dom'
import Register from "./register.jsx";
import Login from "./login.jsx";
import { context } from '../../hooks/Context.jsx';
import NavBar from '../NavBar/index.jsx';
import { useCookies } from 'react-cookie';
 import Home from '../Home/index.jsx';
import UserInfo from '../../hooks/UserInfo.js';






function Auth() {
 
  const [cookies] = useCookies(['access_token'])
  const { logedIn} = useContext(context);
  const {data , loading} =  UserInfo(localStorage.getItem("userID"));

return(<> 
 { localStorage.getItem("userID") ==-1? <></>: <Login/> }
</>)
 
 
   

}

export default Auth
       
      
  
         
