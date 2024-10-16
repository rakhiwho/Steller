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
            const res = await axios.get('http://localhost:3001/user/explorePosts' , { headers , withCredentials :true})

            console.log(res)
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
