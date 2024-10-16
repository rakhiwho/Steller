import React, {  useState } from 'react'
import { UseGetToken } from './useGetToken'
import { useCookies } from 'react-cookie';
import axios from 'axios';
 

function Post_content () {
  
    const {headers} = UseGetToken();
    
const [data , setData] = useState([]);
const [loading , setLoading] = useState(true)
    const post_content = async (content )=>{

        try {
            if(content != undefined ){
            const res =  await axios.post('http://localhost:3001/user/post' ,content,  
                {
                    headers: {
                        ...headers,
                        'Content-Type': 'multipart/form-data',
                    },
                    withCredentials: true
                })

            if(!res.data){
                console.log("somethis went wrong " , res.data);
            }
            else {
                console.log(res.data);
   setData(res.data)
            }
            setLoading(false)
        }
        
            
        } catch (error) {
            console.log('something went wrong!')
        }

    }


  
 
  return {data , post_content} ;
    
}

export default Post_content
