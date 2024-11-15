import React, { useContext, useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import useGetConversation from "../../hooks/useGetConversation";
import Contact from "../auth/contacts";
import Searchres from "./searchres";
import { context } from "../../hooks/Context";
function SearchPage() {
  const { loading, conversation } = useGetConversation();
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const { darkTheme } = useContext(context);
  const handleSearch = (query) => {
    const res = conversation.filter((user) =>
      user.userName.toLowerCase().includes(query.toLowerCase())
    );
    setResults(res);
  };
  useEffect(() => {
    handleSearch(search);
    console.log(results);
  }, [search]);
  return (
    <div
      className={` ${
        !darkTheme ? "bg-indigo-950 text-slate-300" : ""
      } absolute m-0 left-[3.2vw]  flex flex-col h-screen overflow-x-scroll  lg:w-[95.7vw]  md:w-[95vw] w-[94.5vw] pl-6 py-0 user_post   `}
    >
      <div className="h-fit">
        <form className="flex flex-row content-center pt-[2vh] ">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="search"
            className={` ${
              !darkTheme ? "bg-indigo-900 text-slate-300 border-none " : ""
            } p-1 focus-visible:[ border-1px] border-r-0 rounded-r-none border-[1px] w-[50vw]`}
            type="text"
          />
          <button
            className="self-center p-[1px] bg-indigo-700 border-indigo-700 rounded-r-full border-2 border-l-0  "
            type="submit"
          >
            <IoIosSearch className=" size-7  p-1 text-white " />
          </button>
        </form>
      </div>
      <div className="divider m-0 w-[88vw] h-[1px] " />
      <div className="flex content-start h-fit ">
        {search ? (
          <div className=" mt-2  w-[88vw] flex flex-col content-start">
            {results?.length != null &&
              results.map((c) => (
                <div key={c._id}>
                  <Searchres conversations={c} {...c} />
                </div>
              ))}
          </div>
        ) : (
          <span
            className={`${
              !darkTheme ? "text-slate-300" : ""
            } absolute top-[11vh] left-[6vw]`}
          >
            no user found...
          </span>
        )}
      </div>
    </div>
  );
}

export default SearchPage;
