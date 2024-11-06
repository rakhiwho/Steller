import React, { useContext , useState } from "react";
import { MdCancel } from "react-icons/md";
import { context } from "../../hooks/Context";
import UseDeleteConvo from "../../hooks/UseDeleteConvo";
import { useNavigate } from "react-router-dom";

function DeleteConvo({ id }) {
  
  const { deleteConvo } = UseDeleteConvo();
  const { setMessage} =  useContext(context);
  const navigate =  useNavigate();
  const handleDelete = async () => {
    if (id) {
      await deleteConvo(id);
    } else {
      setMessage("cant close this dm yet");
    }
  navigate('/chat')
  location.reload();
  };
  return (
    <>
 
     <div   className={` blur-0 p-3  h-fit w-fit  `}>
       <span className="block" >want to close DM ?</span>
       <button onClick={handleDelete} className="m-3 ml-0 border-b-[1px] border-slate-400 " >Yes</button>
       <button className="m-3 border-b-[1px] border-slate-400">No</button>
      </div>
    </>

  );
}

export default DeleteConvo;
