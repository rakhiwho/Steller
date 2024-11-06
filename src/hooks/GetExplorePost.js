import axios from 'axios'
import React, { useEffect ,  useState } from 'react'
import { UseGetToken } from './useGetToken' 
import { UseSocketContext } from './socketContext';

function GetExplorePost() {
   const {headers} = UseGetToken();
    const [data , setData] = useState([]);
    const [loading , setLoading] = useState(true)
   const {socket} = UseSocketContext();
    const getPost = async ()=>{
        try {
            const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/explorePosts` , { headers , withCredentials :true})
 
          if(!res.data){
             console.log("failed")
          }
  
          setData(res.data);
       setLoading(false);
         } catch (error){
          setLoading(false);
       console.log(error);
         } 
         }
    useEffect(()=>{
        getPost();
       },[socket])
  return { data , loading}
}

export default GetExplorePost
