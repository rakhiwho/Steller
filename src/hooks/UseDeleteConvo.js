import React from 'react'
import { UseGetToken } from './useGetToken'
import axios from 'axios';

function UseDeleteConvo() {
    // varification token 
    const { headers }= UseGetToken();
    
    //coversation deleting 
    const deleteConvo = async (id)=>{
        const res = await axios.delete(`http://localhost:3001/user/deleteConvo/${id}` , {headers , withCredentials:true})
        if(res.data){
     console.log(res.data);
        }

    }

  return  {deleteConvo}
}

export default UseDeleteConvo
