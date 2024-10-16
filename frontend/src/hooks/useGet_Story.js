import React, { useEffect, useState } from 'react'
import { UseGetToken } from './useGetToken'
import axios from 'axios';
import {  UseSocketContext } from './socketContext';
import Use_postStory from './use_postStory';
//import { delete_Story, deleteUser } from '../../../backend/src/Controllers/deleteMethods';
import useDelete_user from './useDelete_user';

function useGet_Story(id) {
      const {socket} = UseSocketContext();

    const [ story , setStory]= useState();

    const {headers}= UseGetToken();
  const { delete_Story} =  useDelete_user(id) ;
    const getStory= async ()=>{

         
       

        try {
            const res =  await axios.get(`http://localhost:3001/user/getStory/${id} ` , {headers , withCredentials: true});
  
            setStory(res.data)

        const fetchedDate =  new Date( res.data?.available_until );
            if(fetchedDate  <= new Date(Date.now())){
      await delete_Story();
            }
        } catch (error) {
            console.log(error)
        }


    }

    useEffect(()=>{
       getStory();


    } , [socket , Use_postStory])

  return {story}
}

export default useGet_Story
