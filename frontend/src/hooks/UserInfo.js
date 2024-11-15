import React, { useEffect, useState } from "react";
import { UseGetToken } from "./useGetToken";
import axios from "axios";
import { UseSocketContext } from "./socketContext";
import useChange_userInfo from "./useChange_userInfo";
import { useCookies } from "react-cookie";

function UserInfo(id) {
  const { headers } = UseGetToken();
  const [data, setData] = useState();
  const { socket } = UseSocketContext();
  const [loading, setLoading] = useState(true);
 const {cookies  , } = useCookies(['access_token']);
 
  const getUserInfo = async () => {
    try {
      const res =   await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/userInfo/${id}`, {
        headers,
        withCredentials: true,
      })
   

      setData(res.data);
      setLoading(false);
    } catch (error) {
      
      setLoading(false);
    }
  };

  useEffect(() => {
  if(id && localStorage.length)   getUserInfo();
  }, [socket, useChange_userInfo , id]);
  return { data, loading };
}

export default UserInfo;
