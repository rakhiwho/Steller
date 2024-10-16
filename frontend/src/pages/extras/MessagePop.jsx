import React from 'react'

function MessagePop({text , type}) {

  return (
    <div className={` ${type==='error' ? 'bg-error' :'bg-green-700'} message fixed  text-white font-medium top-[10vh] right-[35%] lg:right-[40%] px-[2vw] py-[1vh] rounded-xl z-[100]`}>
      <p>{text}</p>
    </div>
  )
}

export default MessagePop
