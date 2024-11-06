import React, { useContext, useState } from "react";
import { GoArrowRight } from "react-icons/go";
 
import axios from "axios";
import { context } from "../../hooks/Context.jsx";
import { UserError } from "../../hooks/Errors.js";
import { useCookies } from "react-cookie";
 
function Register() {
  const { registered, setRegistered, logedIn } = useContext(context);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState(" ");
  const [, setCookies] = useCookies("access_token");
  const backendUrl =import.meta.env.VITE_BACKEND_URL;

  const register = async (e) => {
    e.preventDefault();
    setCookies("access_token", null);
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
    } catch (error) {
      if (error?.response?.data?.type === UserError.USERNAME_ALREADY_EXISTS) {
        setError(UserError.USERNAME_ALREADY_EXISTS);
      } else {
        setError(" ");
        setMessage("something went wrong!");
        alert(error);
      }
    }
  };

  if (registered) {
    console.log(registered);
  }
  return (
    <>
      <div className="bg-indigo-200 w-70% text-black-400 h-screen/2 mx-12 my-36">
        <h1 className="text-2xl self-center py-5 px-3">REGISTER HERE :</h1>

        <form className="flex flex-col mx-12" onSubmit={register}>
          <div className="bg-indigo-600/50 h-12 w-90 px-12 py-5">
     
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="rounded-lg pl-2"
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
              className="cursor-pointer  ring-offset-0 rounded-lg pl-2"
              id="password"
              name="password"
            />
          </div>

          <input
            className="cursor-pointer self-center bg-indigo-950 w-24 text-slate-100 h-12 my-2 rounded-lg"
            type="submit"
            value="SUBMIT"
          />
        </form>
        <div className="self-center flex items-center flex-col">
          {error && <p className="text-red-600 size-xl">{error}</p>}
          {message && <p className="text-green-600 size-xl">{message}</p>}
          <p className="w-56 inline flex justify-between">
            {" "}
            Done signing in click <GoArrowRight className="my-1.5" />{" "}
            <span
              className="cursor-pointer"
              onClick={() => setRegistered(true)}
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </>
  );
}

export default Register;
