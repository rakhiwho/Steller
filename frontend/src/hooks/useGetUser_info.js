import React, { useEffect, useState } from "react";
import { UseGetToken } from "./useGetToken";
import axios from "axios";
import { useCookies } from "react-cookie";
import { UseSocketContext } from "./socketContext";
import useChange_userInfo from "./useChange_userInfo";
function useGetUser_info() {
  const { headers } = UseGetToken();
  const { socket } = UseSocketContext();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
 

    const get_user = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/userProfile`, {
          headers: { headers },
          withCredentials: true,
        });

        if (!res.data) {
          console.log("failed");
        }

        setData(res.data);
       
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    useEffect(() => {
    get_user();
  }, [socket, useChange_userInfo]);

  return { data  , loading};
}

export default useGetUser_info;
