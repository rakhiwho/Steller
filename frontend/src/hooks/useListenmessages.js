import React, { useEffect } from 'react'
import { UseSocketContext } from './socketContext'
import useConversation from './useconversation';

function useListenMessages() {
const {socket}  =UseSocketContext();
const { messages , setMessages} = useConversation();
useEffect(()=>{

    socket?.on('newMessage' , (newMessage)=>{
        setMessages([...messages ,  newMassage])
    })

    return ()=> socket?.off("newMwssage");
},
[socket , setMessages , messages])
}

export default useListenMessages
