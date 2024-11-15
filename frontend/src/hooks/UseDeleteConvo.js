import React from 'react'
import { UseGetToken } from './useGetToken'
import axios from 'axios';

function UseDeleteConvo() {
    // varification token 
    const { headers }= UseGetToken();
    
    //coversation deleting 
    const deleteConvo = async (id)=>{
        const res = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/user/deleteConvo/${id}` , {headers , withCredentials:true})
      

    }

  return  {deleteConvo}
}

export default UseDeleteConvo
