import React from 'react'
import { UseGetToken } from './useGetToken'
import axios from 'axios';

function DeletePost() {
   const {headers} = UseGetToken();
   const deletePost = async (id)=>{
    
    try {
        
        const res = await axios.delete(`http://localhost:3001/user/deletePost/${id}` , {
            headers , withCredentials :true
        })
    
        return res;
    } catch (error) {
        console.log(error)
    }

   }

  return {deletePost}
}

export default DeletePost
