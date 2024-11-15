import React, { useContext, useState } from 'react'
import { UseGetToken } from './useGetToken'
import axios from 'axios';
import { useEffect } from 'react';
import { Socket } from 'socket.io-client';
import { UseSocketContext } from './socketContext';
import { context } from './Context';

function useGetFriends() {
  
    const {socket} = UseSocketContext();
    const { headers}= UseGetToken();
    const [ friends , setFriends ] = useState([]);
    const {setFriend} = useContext(context)
    const get_friends = async ()=>{
        try {
            
            const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/getUsers` , {headers ,  withCredentials: true })
    
             setFriends(res.data);
             setFriend(res.data)
             if(!friends){
                console.log('something went wrong!')
             }
        } catch (error) {
            console.log(error)
        }
    }
  useEffect(()=>{
    get_friends();
  }, [socket])
  return {friends}
}

export default useGetFriends
