import React, { useEffect, useState } from 'react'
import { UseGetToken } from './useGetToken'
import axios from 'axios';
import AddLike from './addLike';
import PostComment from './postComment';
 
 function GetComment(id) {
     const {headers}= UseGetToken();
     const [data , setData] = useState();
     const [loading , setLoading] = useState(true)
     const [error , setError] = useState(false)
   const Comment= async ()=>{

       try {
   
           const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/get_comment/${id}` , {
               headers , 
               withCredentials:true
           });
   
           if(res.data){
              
               setData(res.data);
               
           }else{

               console.log("something went wrong")
               setError(true)
           }
           setLoading(false)
           
       } catch (error) {

           console.log(error)
           setLoading(false)
       }
   }

   useEffect(()=>{
   Comment();
   },[id , AddLike])

  return  {data , loading , error}
}

export default GetComment
