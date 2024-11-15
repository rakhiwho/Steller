import React, { useContext } from 'react'
// import {BrowserRouter as Router, Route, Routes }  from 'react-router-dom'
import Register from "./register.jsx";
import Login from "./login.jsx";
import { context } from '../../hooks/Context.jsx';
import NavBar from '../NavBar/index.jsx';
import { useCookies } from 'react-cookie';







function Auth() {
 
  const [cookies] = useCookies(['access_token'])
  const {registered  , logedIn} = useContext(context);



 if(!registered){

    return(
      <>
    
   {  !cookies || cookies.access_token ===null &&  <Register/>}
      </>
    )
  }else if(registered) {
    return(
    <>
    { !cookies ||  cookies.access_token===null &&<Login/>}
    </>)
  }
 
  return <NavBar/>

}

export default Auth
       
      
  
         
