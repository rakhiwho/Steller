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
        const res = await axios.put(`http://localhost:3001/user/follow/${id}`, {} ,  {headers , withCredentials : true}  )
        if(res.data){
         console.log(res.data)
        }
        
      } catch (error) {
        console.log(error)
      }
    }
  


  
  
 


  return  { usefollow }
}

export default UseFollow