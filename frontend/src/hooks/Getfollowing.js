import React, { useEffect, useState } from 'react'
import { UseGetToken } from './useGetToken'
import axios  from 'axios'
import { UseSocketContext } from './socketContext';
function Getfollowing(id) {
    
    const {headers} = UseGetToken();
    const [data , setData] = useState()
   const [loading ,setLoading] = useState(true);
   const {socket} = UseSocketContext();
    const getFollowingFollowers = async ()=>{

   try {
    
       const res = await axios.get(`http://localhost:3001/user/getFollowingFollowers/${id}`, {headers , withCredentials :true})
    
       if(res.data){
      setData(res.data);
      console.log(res.data);
      setLoading(false)
      } 
 
    
   } catch(error) {
    console.log(error)
    setLoading(false)
   }


    

    }

    useEffect(()=>{
      getFollowingFollowers();
    } , [id , socket])

  return  {data , loading}
}

export default Getfollowing
