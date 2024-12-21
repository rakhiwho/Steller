import React, { useContext, useState } from "react";
import { GoArrowRight } from "react-icons/go";
import { IoIosEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";
import { Cookies, useCookies } from "react-cookie";
import { context } from "../../hooks/Context.jsx";
import { UserError } from "../../hooks/Errors.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NavBar from "../NavBar/index.jsx";
import useGetUser_info from "../../hooks/useGetUser_info.js";

function Login() {
  const { setRegistered, setLogedIn, logedIn, setUser } = useContext(context);
  const [passwordVisibility, setPasswordVisiility] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState(" ");
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();
  const { data, loading } = useGetUser_info();
 

  const login = async (e) => {
    e.preventDefault();
    if (!userName || !password) {
      setError(UserError.MISSING_INFO);
      return;
    } else {
      setError(" ");
    }
    try {
      const result = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/user/login`,
        {
          userName,
          password,
        }
      );

      setCookies("access_token", result.data.token);
      sessionStorage.setItem("userID", result.data.userID);
      localStorage.setItem("userID", result.data.userID);

      setMessage(" logged in successfully!!");
      setUserName("");
      setPassword("");
      navigate("/");
    } catch (error) {
      if (error?.response?.data?.type === UserError.USERNAME_ALREADY_EXISTS) {
        setError(UserError.USERNAME_ALREADY_EXISTS);
      } else {
        setError("something went wrong!", +"[" + error + "]");
      }
    }
  };

  return (
    <div className="flex h-screen items-center  flex-col justify-center">
      <div className="dark:bg-indigo-200 dark:text-black  bg-indigo-200 fixed z-100   text-black-400 w-[23rem]  h-fit mx-10 my-32">
        <h1 className="text-2xl self-center py-5 px-3">LOGIN HERE :</h1>
        <form className="flex flex-col mx-12" onSubmit={login} id="login">
          <div className="bg-indigo-600/50 h-12 w-fit px-12 py-5">
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="dark:bg-white dark:text-black cursor-pointer rounded-lg pl-2"
              id="userName"
              name="userName"
              placeholder="username"
            />
          </div>
          <div className="bg-indigo-600/50 h-12 w-fit px-12 py-12 relative  ">
            <input
              type={`${passwordVisibility ? "text" : "password"}`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="dark:bg-white dark:text-black cursor-pointer  ring-offset-0 rounded-lg pl-2"
              id="password"
              name="password"
              placeholder="password"
            />
            {!passwordVisibility ? (
              <IoIosEyeOff
                onClick={() => setPasswordVisiility(!passwordVisibility)}
                className="bg-white  absolute top-[50%] right-[16%] size-6 text-slate-600 rounded-lg "
              />
            ) : (
              <IoIosEye
                onClick={() => setPasswordVisiility(!passwordVisibility)}
                className="bg-white  absolute top-[50%] right-[16%] size-6 text-slate-600 rounded-lg "
              />
            )}
          </div>
          <input
            className="self-center bg-indigo-950 w-24 text-slate-100 h-12 my-2 rounded-lg"
            type="submit"
            value="SUBMIT"
          />
        </form>
        <div className="cursor-pointer self-center flex items-center flex-col">
          {error && <p className="text-red-600 size-xl">{error}</p>}
          {message && <p className="text-green-600 size-xl">{message}</p>}
          <p className=" dark:text-black w-70  flex justify-between">
            <>don't have an account? Click </>{" "}
            <GoArrowRight className="my-1.5" />
          </p>
          <span
            className="cursor-pointer"
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </div>
      </div>
    </div>
  );
}

export default Login;
