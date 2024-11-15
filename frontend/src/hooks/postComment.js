import React, { useEffect, useState } from 'react'
import { UseGetToken } from './useGetToken';
import axios from 'axios';

function PostComment() {

   
    const{header}=UseGetToken();

    
    const AddComment = async (id , comment)=>{
        try {
   const res = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/user/addComment/${id}` , {comments : comment} , {header , withCredentials:true} )
  
   if(!res.data){
    console.log("something went wrong!")
   }
} catch (error) {
    console.log(error)
}
AddComment();
    }


return {AddComment }
}

export default PostComment
