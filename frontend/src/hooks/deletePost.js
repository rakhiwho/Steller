import React from 'react'
import { UseGetToken } from './useGetToken'
import axios from 'axios';

function DeletePost() {
   const {headers} = UseGetToken();
   const deletePost = async (id)=>{
    
    try {
        
        const res = await axios.delete(`${import.meta.env.VITE_BACKEND_URL }/user/deletePost/${id}` , {
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
