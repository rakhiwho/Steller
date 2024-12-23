import React from 'react'
import { UseGetToken } from './useGetToken'
import axios from 'axios';

function useDelete_user(userID) {

const {headers}= UseGetToken();

const delete_user = async()=>{


    try {
        
    const res = await  axios.delete(`${import.meta.env.VITE_BACKEND_URL}/user/delete_user` , {headers , withCredentials :true});

    if(res.data){
        console.log("delete user sicccessfully yey !");

    }

    } catch (error) {
        console.log(error);

    }

}


const delete_Story =  async()=>{
    
    try {
    const res = await  axios.delete(`${import.meta.env.VITE_BACKEND_URL}/user/delete_Story/${userID}` , {headers , withCredentials :true});

   

    } catch (error) {
        console.log(error);

    }

}
  return {delete_user , delete_Story};
}

export default useDelete_user
