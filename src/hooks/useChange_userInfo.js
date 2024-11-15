import React, { useEffect } from 'react'
import useConversation from './useconversation';
import { UseGetToken } from './useGetToken';
import axios from 'axios';


function useChange_userInfo(userName, password, profilePic, gender, about) {
  const { headers } = UseGetToken();

      const changeInfo = async () => {
          try {
              const formData = new FormData();
              if (userName) formData.append('userName', userName);
              if (password) formData.append('password', password);
              if (gender) formData.append('gender', gender);
              if (about) formData.append('about', about);
              if (profilePic) formData.append('profilePic', profilePic); // Assuming profilePic is a File object

              const res = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/user/editProfile`, formData, {
                  headers: {
                      ...headers,
                      'Content-Type': 'multipart/form-data',
                  },
                  withCredentials: true
              });

              console.log('Changed data successfully:', res.data);
          } catch (error) {
              console.error('Error changing user info:', error);
          }
      };

      changeInfo();
      
  useEffect(() => {
    changeInfo();
  }, [userName, password,profilePic, gender, about, headers]); // Add dependencies to the useEffect


 return {changeInfo}
}

export default useChange_userInfo
