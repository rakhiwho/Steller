import axios from 'axios'
import React from 'react'
import { UseGetToken } from './useGetToken'

function useDelete_message(messageID) {

 const {headers} = UseGetToken();


    const  delete_message = async ()=>{
   
        try {
            const res = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/user/delete_message`, {
                headers,
                params: { id: messageID },  // Correct way to send query parameters
                withCredentials: true
              });
            
            if(!res){
             console.log("somethg went wrong")
            }
        } catch (error) {
            console.log(error)
        }

    }



  return {delete_message}
}

export default useDelete_message
