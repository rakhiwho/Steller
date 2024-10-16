import React, { useContext } from 'react'
import { context } from '../../hooks/Context';
import Update from './update';
import Index from '.';
import { useCookies } from 'react-cookie';
function Profile() {
    const {change} = useContext(context);
 // console.log(change)
   const [cookies , ] = useCookies(["access_token"]);
 if(!change ){
return (
    <Index/>
    
)
 }else{

    return (
        <>
      <Update/>
      
        </>
     
    
      )
 }
 
}

export default Profile
