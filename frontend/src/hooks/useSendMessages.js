import React from 'react'
import useConversation from './useconversation'
import axios from 'axios';
import { UseGetToken } from './useGetToken.js';
import useGetMessages from './useGetMessages.js';


function useSendMessages(id) {
  const { messages , setMessages }=  useConversation();
   
      const {headers} = UseGetToken();
 
  const sendMessages = async (message)=>{

       
   try {
    const res = await axios.post(`http://localhost:3001/user/send/${id}`, 
       {messages : message}, {   headers:{headers}, withCredentials: true});
      
      console.log('Message sent successfully:', res.data);
   // const data = await res.json();
   
   
    if (!res.data) {
        console.log("errrorroorroroororororro");
    }

    setMessages([...messages , res.data]);
  
    
   } catch (error) {
    console.log(error);
   }
  }
  return {messages , sendMessages};
 
}

export default useSendMessages