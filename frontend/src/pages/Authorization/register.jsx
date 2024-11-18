import React, { useContext, useState } from "react";
import { GoArrowRight } from "react-icons/go";
 
import axios from "axios";
import { context } from "../../hooks/Context.jsx";
import { UserError } from "../../hooks/Errors.js";
import { Cookies, useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
 
function Register() {
  const {   logedIn } = useContext(context);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState(" ");
  const [cookies, setCookies] = useCookies(["access_token"]);
  const backendUrl =import.meta.env.VITE_BACKEND_URL;
 const navigate = useNavigate();
 if(cookies.access_token?.value !=null){
  navigate("/");
 }
  const register = async (e) => {
    e.preventDefault();
    
    if (!userName || !password) {
      setError(UserError.MISSING_INFO);
      return;
    } else {
      setError(" ");
    }
    try {
      await axios.post( `${backendUrl}/user/register`, {
        userName,
        password,
      });
      setMessage(" registered successfully!!");
      setUserName("");
      setPassword("");
      navigate("/login");
    } catch (error) {
      if (error?.response?.data?.type === UserError.USERNAME_ALREADY_EXISTS) {
        setError(UserError.USERNAME_ALREADY_EXISTS);
      } else {
        setError(" ");
        setError("something went wrong!");
        alert(error);
      }
    }
  };

  
  return (
    <>{ 
   cookies.access_token?.value ==null &&
<<<<<<< HEAD
      <div className=" dark:bg-indigo-950 dark:text-black bg-indigo-200 fixed z-100 top lg:left-[30%] md:left-[17%]   w-[23rem] text-black-400 h-screen/2 mx-12 my-36">
        <h1 className="text-2xl self-center py-5 px-3">REGISTER HERE :</h1>
=======
      <div className="bg-indigo-400 dark:text-black bg-indigo-200 fixed z-100 top lg:left-[30%] md:left-[17%]   w-[23rem] text-black-400 h-screen/2 mx-12 my-36">
        <h1 className=" dark:text-black text-2xl self-center py-5 px-3">REGISTER HERE :</h1>
>>>>>>> 48194c4e153401851b2fa462b9f9d21187b2c2b6

        <form className="flex flex-col mx-12" onSubmit={register}>
          <div className="dark:text-black bg-indigo-600/50 h-12 w-90 px-12 py-5">
     
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
<<<<<<< HEAD
              className="rounded-lg pl-2 dark:bg-indigo-950 dark:text-black"
=======
              className="rounded-lg pl-2 dark:bg-white dark:text-black"
>>>>>>> 48194c4e153401851b2fa462b9f9d21187b2c2b6
              id="userName"
              name="userName"
              placeholder="userName"
        
            />
          </div>

          <div className="bg-indigo-600/50 h-10 w-90 px-12 py-12">
             
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
<<<<<<< HEAD
              className="cursor-pointer dark:bg-indigo-950 dark:text-black ring-offset-0 rounded-lg pl-2"
=======
              className="cursor-pointer  ring-offset-0 rounded-lg pl-2 dark:bg-white dark:text-black"
>>>>>>> 48194c4e153401851b2fa462b9f9d21187b2c2b6
              id="password"
              name="password"
            />
          </div>

          <input
            className=" dark:bg-indigo-950 dark:text-black cursor-pointer self-center bg-indigo-950 w-24 text-slate-100 h-12 my-2 rounded-lg"
            type="submit"
            value="SUBMIT"
          />
        </form>
        <div className="dark:bg-indigo-950 dark:text-black self-center flex items-center flex-col">
          {error && <p className="text-red-600 size-xl">{error}</p>}
          {message && <p className="text-green-600 size-xl">{message}</p>}
<<<<<<< HEAD
          <p className="w-56 inline flex justify-between dark:bg-indigo-950 dark:text-black">
=======
          <p className="w-56 inline flex justify-between  dark:text-black">
>>>>>>> 48194c4e153401851b2fa462b9f9d21187b2c2b6
            {" "}
            Done signing in click <GoArrowRight className="my-1.5 dark:bg-indigo-950 dark:text-black" />{" "}
            <span
              className="cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>
        </div>
      </div> }
    </>
  );
}

export default Register;
