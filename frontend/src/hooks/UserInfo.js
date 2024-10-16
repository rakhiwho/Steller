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
      const res =   await axios.get(`http://localhost:3001/user/userInfo/${id}`, {
        headers,
        withCredentials: true,
      })
      if (!res.data) {
        return "data is null";
      }

      setData(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
  if(id && localStorage.length)   getUserInfo();
  }, [socket, useChange_userInfo , id]);
  return { data, loading };
}

export default UserInfo;
