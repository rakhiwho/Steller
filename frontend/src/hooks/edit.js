import axios from 'axios'
import React, { useState } from 'react'
import { UseGetToken } from './useGetToken'

function EditPost() {

  const [data , setData] = useState([])
    const {headers} = UseGetToken();
  const editPost = async (id , content)=>{

    try {
        
        const res = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/user/edit/${id}` , {content}  , {headers , withCredentials : true} )
     
        if(res.data){
         setData(res.data)
        return res;
        }
    } catch (error) {
        console.log(error)
    }
  }
    
  return {editPost}
}

export default EditPost
