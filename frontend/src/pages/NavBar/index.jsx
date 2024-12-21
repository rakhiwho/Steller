import { Link, useNavigate, useParams } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import "./style.css";
import Cookies from "js-cookie";
import { useCookies } from "react-cookie";
import { context } from "../../hooks/Context.jsx";
import { useContext, useEffect } from "react";
import { MdOutlineLogout } from "react-icons/md";
import Auth from "../Authorization/index.jsx";
import CallOutGoing from "../extras/callComponents/callOutGoing.jsx";
import { UseSocketContext } from "../../hooks/socketContext.jsx";
import useVideoChat from "../../hooks/callsystem.js";
import VoiceCallPage from "../extras/callComponents/CallingPage.jsx";
 
import UserInfo from "../../hooks/UserInfo.js";
import useGetUser_info from "../../hooks/useGetUser_info.js";
import axios from "axios";

export const NavBar = () => {
  const navigate = useNavigate();
  const [cookies, setCookies] = useCookies(["access_token"]);
  const {  isvoiceCalling } =
    useContext(context);
 

  const { data, loading } = useGetUser_info();
  const {
  
    isCalling: calling,
  } = useVideoChat(
    localStorage.getItem("userID"),
    localStorage.getItem("selectedUser")
  );
  const logOut = async () => {
    let res = prompt("Are you sure you want to log out? (type yes/no)");
    if (res && res.toLowerCase().startsWith("y")) {
      localStorage.clear();
      const res =  await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/logout`, {} ,{ withCredentials: true });
      console.log(res);
      navigate("/login");
    }
  };
  
 
      
    if( window.location.pathname != "/login" && cookies.access_token ==  null ){
      localStorage.clear();
      if( window.location.pathname != "/register") {
        window.location.assign("/login") 
      }
    }
   if(cookies.access_token ==  null){
    window.location.assign("/login") 
   }
 
  return (
    <>
      <div  className="navbar  h-fit mb-0">
        <div>
          <CallOutGoing />
        </div>
        {isvoiceCalling && (
          <div className="">
            <VoiceCallPage />
          </div>
        )}
        <div className="navbar-title">
          <h1 className=" flex flex-row  bg-gradient-to-r from-indigo-950 via-black-500 to-indigo-700 ...">
            <span className=" font-medium  flex flex-row flex-1">
            Stellar
              {data?.userName != undefined && <MdOutlineLogout onClick={logOut} />}
            </span>{" "}
            <IoMdArrowBack
              className="text-white size-5 mr-3 "
              onClick={() => navigate("/")}
            />
          </h1>
        </div>

        
      </div>
    </>
  );
};

export default NavBar;
