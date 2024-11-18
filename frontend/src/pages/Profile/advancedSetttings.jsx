import React, { useContext, useEffect, useState } from "react";
import { context } from "../../hooks/Context";
import { HiCheckCircle } from "react-icons/hi";
import { MdCancel } from "react-icons/md";
import "./style.css";
import axios from "axios";
import { UseGetToken } from "../../hooks/useGetToken";
function AdvancedSetttings({ privacy }) {
  
  const [privacysetting, setPrivacysetting] = useState(false);
  const { setChange, setAdvanced, darkTheme, setDarkTheme } = useContext(context);
  const [valPrivacy, setValPrivacy] = useState(privacy);
  const { headers } = UseGetToken();

  const handleprivacy = async (privacy) => {
    const res = await axios.put(
      "http://localhost:3001/user/privacy",
      { privacy },
      {
        headers,
        withCredentials: true,
      }
    );
    if (res.data) {
      setValPrivacy(privacy);
      setAdvanced(false);
    }
    location.reload();
  };
  const togglePrivacySetting = () => {
    setPrivacysetting(!privacysetting);
  };

  useEffect(() => {
    if (!darkTheme) {
      localStorage.setItem("dark", "true");
    } else {
      localStorage.removeItem("dark");
    }
  }, [darkTheme]);

  return (
    <div
      className={`  ${
        !darkTheme ? "bg-indigo-950" : "bg-white"
      } div1 flex flex-col  w-fit h-fit p-4  `}
    >
      <MdCancel
        onClick={() => setAdvanced(false)}
        className="absolute right-2 top-2 "
      />
      <li className="list-none" onClick={() => setChange(true)}>
        edit
      </li>
      <div className="divider m-0 my-1 "></div>

      <li className="list-none h-fit w-fit " onClick={togglePrivacySetting}>
        {" "}
        <div>
          privacy
          {!privacysetting && (
            <div className="div1  flex flex-col  w-[13vw] h-fit p-2  ">
              <p
                className="list-none flex flex-row justify-between  "
                onClick={() => handleprivacy("public")}
              >
                public{" "}
                {valPrivacy === "public" && (
                  <HiCheckCircle className=" self-center ml-2 " />
                )}{" "}
              </p>
              <div className="divider m-0 my-1 "></div>

              <p
                className="list-none flex flex-row justify-between "
                onClick={() => handleprivacy("private")}
              >
                private{" "}
                {valPrivacy === "private" && (
                  <HiCheckCircle className=" self-center ml-2 " />
                )}
              </p>

              <div className="divider m-0 my-1 "></div>
              <p
                className="list-none flex flex-row justify-between "
                onClick={() => handleprivacy("following")}
              >
                {" "}
                following{" "}
                {valPrivacy === "following" && (
                  <HiCheckCircle className=" self-center ml-1  " />
                )}
              </p>
            </div>
          )}
        </div>
      </li>
      <div className="divider m-0 my-1 w-fit "></div>
      <li className="list-none inline" onClick={() => setDarkTheme(!darkTheme)}>
        darkTheme {!darkTheme && <HiCheckCircle className="inline" />}
      </li>
      <div className="divider m-0  my-1"></div>
    </div>
  );
}

export default AdvancedSetttings;
