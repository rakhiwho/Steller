// ChatLayout.js
import React from 'react';
import { Outlet } from 'react-router-dom';

function Chat() {
  return (
    <div className='   ' >

      {/* The Outlet component renders the child routes */}
      <Outlet />
    </div>
  );
}

export default Chat;
