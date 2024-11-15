import React, { useEffect } from 'react'
 
import UseGetToken from './useGetUser_info'
import axios from 'axios';
import { useCookies } from 'react-cookie';
 



function UseFollow() {
  const {headers}= UseGetToken();

 //const [cookies , ] = useCookies(['access_token']);
   console.log(headers)
    const usefollow = async (id)=>{
  

      try {
        const res = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/user/follow/${id}`, {} ,  {headers , withCredentials : true}  )
        
      } catch (error) {
        console.log(error)
      }
    }
  


  
  
 


  return  { usefollow }
}

export default UseFollow
