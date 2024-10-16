import { Link, useNavigate, useParams } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import "./style.css";
import { useCookies } from "react-cookie";
import { context } from "../../hooks/Context.jsx";
import { useContext , useEffect} from "react";
import { MdOutlineLogout } from "react-icons/md";
import Auth from "../Authorization/index.jsx";
import CallOutGoing from "../extras/callComponents/callOutGoing.jsx";
import { UseSocketContext } from "../../hooks/socketContext.jsx";
import useVideoChat from "../../hooks/callsystem.js";
import VoiceCallPage from "../extras/callComponents/CallingPage.jsx";
 

export const NavBar = () => {
  const navigate = useNavigate();
  const [, setCookies] = useCookies(["access_token"]);
  const { logedIn , isCalling , setIsCalling , isvoiceCalling} = useContext(context);
  const {socket} = UseSocketContext();
  const [cookies] = useCookies(['access_token'])
  const {endCall , acceptCall , initiateCall  , isCalling :calling  } = useVideoChat(  localStorage.getItem('userID') , localStorage.getItem('selectedUser') )
  const logOut = () => {
    let res = prompt("Are you sure you want to log out? (type yes/no)");
    if (res && res.toLowerCase().startsWith("y")) {
      localStorage.clear();
      setCookies("access_token", null);
      navigate("/");
    }
  }; 
  
  return (
    <>
      <div className="navbar  h-fit mb-0">
        <div>
          <CallOutGoing />
        </div>
        {isvoiceCalling && 
        <div className="">
        <VoiceCallPage />
        </div>}
        <div className="navbar-title">
          <h1 className=" flex flex-row  bg-gradient-to-r from-indigo-950 via-black-500 to-indigo-700 ...">
            <span className=" font-medium  flex flex-row flex-1">
              UZUMAKI
            {        <MdOutlineLogout
              
                onClick={logOut}
              />}
            </span>{" "}
            <IoMdArrowBack
              className="text-white size-5 mr-3 "
              onClick={() => navigate("/")}
            />
          </h1>
        </div>

        <div>{  !cookies.access_token  
        && <Auth />}</div>
      </div>
    </>
  );
};

export default NavBar;
