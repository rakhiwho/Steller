import React, { useState , useContext } from "react";
import { MdExplore } from "react-icons/md";
import { BsGrid1X2Fill } from "react-icons/bs";
import { MdAddBox } from "react-icons/md";
import { IoGameControllerSharp } from "react-icons/io5";
import { BsThreeDots } from "react-icons/bs";
import "./style.css";
import { context } from "../../hooks/Context";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
function SideBar() {
  const {darkTheme} = useContext(context);
  const [cookies , ] = useCookies(['access_token']);
  return (
    <>
    {cookies.access_token && <div className={` ${!darkTheme ?'bg-indigo-950 text-slate-300 shadow-2xl  shadow-black  ':''} sidebar `} >
      <div className="div flex flex-col lg:px-4  px-2 justify-between text-indigo-900">
        <Link className="Link mt-3" to="/explore">
          <MdExplore className="size-7   " />
        </Link>
        <div className="divider m-2   "></div>

        <Link className="Link" to="/">
          <BsGrid1X2Fill className="size-7" />
        </Link>
        <div className="divider m-2    "></div>

        <Link className="Link" to="/add_post">
          <MdAddBox className="size-7" />
        </Link>
        <div className="divider m-2  "></div>

        <Link className="Link" to="/games">
          <IoGameControllerSharp className="size-7" />
        </Link>
        <div className="divider m-2 "></div>

        <Link className="Link" to="/more">
          <BsThreeDots className="size-7" />
        </Link>
        <div className="divider m-2  "></div>
      </div>
    </div>}
    </>
    
  );
}

export default SideBar;
