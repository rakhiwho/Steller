import React, { useState } from 'react'
import { UseGetToken } from './useGetToken'
import axios from 'axios';



function AddLike(postID , commentID) {
 
    const {headers}= UseGetToken();
    const [data ,setData]= useState();
    
   const Like = async ()=>{

    try {
        
        const res =  await axios.put('http://localhost:3001/user/like' , 
           {
               postID :postID ,
               commentID :commentID
           },
       {
           headers ,
           withCredentials :true
       })
       if(res.data){
       setData(res.data)
       }else{
        console.log("reasuld undefined")
       }
    } catch (error) {
        console.log("something went wrong")
    }



   }

  return {data , Like}
}

export default AddLike
