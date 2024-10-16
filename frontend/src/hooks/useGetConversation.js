import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { UseGetToken } from './useGetToken';
import { Socket } from 'socket.io-client';
import { UseSocketContext } from './socketContext';


function useGetConversation() {

    const [ loading , setLoading] = useState(false);
    const [conversation , setConversation] =useState([]);
   const {socket} = UseSocketContext();
   
    const {headers} = UseGetToken();
    useEffect(()=>{
        const getConversation= async ()=>{
            setLoading(true);
            try{

               
                const res = await axios.get(`http://localhost:3001/user/` , {   headers:{headers}, withCredentials: true});
        

      //  const data = await res.json();
   
        if(!res.data){
          console.log("success , from use get conversation")
        }
      
      setConversation(res.data)
      
      }catch(error){
     console.log(error)
            }
        }
 
        getConversation();

    },[socket])
//  
  return {loading , conversation };
}

export default useGetConversation
