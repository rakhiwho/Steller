import React, { useEffect, useState } from 'react'
import { UseGetToken } from './useGetToken';
import axios from 'axios';

function PostComment() {

   
    const{header}=UseGetToken();

    
    const AddComment = async (id , comment)=>{
        try {
   const res = await axios.put(`http://localhost:3001/user/addComment/${id}` , {comments : comment} , {header , withCredentials:true} )
   console.log(res.data)
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
