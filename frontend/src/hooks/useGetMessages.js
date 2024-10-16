import React, { useEffect, useState } from 'react'
import useConversation from './useconversation'
import { UseGetToken } from './useGetToken';
import axios from 'axios';
import { UseSocketContext } from './socketContext';

function useGetMessages(id) {

const [loading , setLoading] = useState(true);
 
const [fetchedMessage , setFetchedMessage] = useState([]);
const { socket}  = UseSocketContext();
const {headers} = UseGetToken();
    const getMessages =async ()=>{


  try {
      const res = await axios.get(`http://localhost:3001/user/get/${id}` ,{   headers:{headers}, withCredentials: true});

     
    
      if (res.data) {
        
     setFetchedMessage(res.data);
   
      } else {
        console.error("No data received");
      }
    
      setLoading(false);
  } catch (error) {
      console.log(error)
      setLoading(false)
  }
}

useEffect(()=>{
 if(id){ getMessages();}
 },[ id, socket, headers]);


  return {fetchedMessage , loading};
  
}

export default useGetMessages
