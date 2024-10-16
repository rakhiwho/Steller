 
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { UseSocketContext } from './socketContext'
 
import { UseGetToken } from './useGetToken'
import { context } from './Context'


function UseGetPost(id) {
    const [data ,setData] = useState([])
    const [homePost , setHomePost] = useState([]) 
    const [loading , setLoading] = useState(true)
    const {headers}= UseGetToken();
    const {socket} =UseSocketContext()
    const { selectedPage} = useContext(context)

   
    const getPost = async ()=>{
        try {
          const res =  await  axios.get( `http://localhost:3001/user/get_Post/${id}` , {   headers, withCredentials: true})
  
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
      

         
         const allPost = async ()=>{
            
            try {
               
               const res = await axios.get('http://localhost:3001/user/getFollowingsPost' , { headers , withCredentials: true})
               
               if(!res.data){
                  console.log("something went wrong");
                  
               }
               console.log(res.data)
               setHomePost(res.data)
            } catch (error) {
               console.log(" client side error bwahhahaha >.<")
            }
            
            setLoading(false)
            
         }
         useEffect(() => {
           
             if(id) getPost();
             allPost();
          
      }, [selectedPage , id , socket]);  // Added `id` to dependency array
    
   return {data , loading , homePost};
}

export default UseGetPost
