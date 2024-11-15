import React, { useContext, useState } from 'react';

import './style.css';



import SideBar from '../../pages/auth/sideBar';
import ChatBox from '../auth/ChatBox';
import { context } from '../../hooks/Context';

function ChatHome() {
 
const {blur } = useContext(context)
  return (
    <>
      <div className={` mt-[7.8vh] home flex flex-row`}>

        <SideBar />



        {/* ------------------------chat box---------------- */}
        <ChatBox/>
      
        
      </div>
    </>
  );
}

export default ChatHome;
