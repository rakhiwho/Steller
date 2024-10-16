import axios from 'axios'
import React, { useState } from 'react'
import { UseGetToken } from './useGetToken'

function EditPost() {

  const [data , setData] = useState([])
    const {headers} = UseGetToken();
  const editPost = async (id , content)=>{

    try {
        
        const res = await axios.put(`http://localhost:3001/user/edit/${id}` , {content}  , {headers , withCredentials : true} )
     
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
