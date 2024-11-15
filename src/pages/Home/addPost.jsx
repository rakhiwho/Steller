import React, {useEffect, useContext, useRef, useState } from "react";
import Post_content from "../../hooks/use_Post";
import { MdAddPhotoAlternate } from "react-icons/md";
import { IoAdd } from "react-icons/io5";
import Loading from "../extras/loading";
import { context } from "../../hooks/Context";
import MessagePop from "../extras/MessagePop";
function AddPost() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const { data, post_content, loading:loading_o } = Post_content();
  const [caption, setCaption] = useState("");
  const refButton = useRef("");
  const {darkTheme} = useContext(context);
 const [message , setMessage] = useState(false);

  const [loading , setLoading] = useState(false)
  const handleFileChange = (e) => {
    // Update state with selected files
    setSelectedFiles((prevFiles) => [
      ...prevFiles,
      ...Array.from(e.target.files),
    ]);
  };

  const handleRef = () => {
    refButton.current.click();
  };

  const handleFileUpload = async () => {
    setLoading(true);

    const formData = new FormData();

    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append("photos", selectedFiles[i]); // 'files' is the key you will access in the backend
    }
    if (caption) formData.append("caption", caption);
    await post_content(formData);
    setMessage(true)

    setSelectedFiles([]);
    setCaption("");
    setLoading(false);
    
  };
  useEffect(() => {
    if(message ===true){

      const intervalId = setInterval(() => {
         setMessage(false);
  
      }, 1500);
      return () => clearInterval(intervalId);
    }
  
    
  }, [message]);
  return (
    <>
    <div className={`${!darkTheme ?'bg-indigo-900':''} h-[92.3vh] lg:fixed lg:left-[3.3vw] lg:w-[98vw] w-[95vw] pl-3 py-0 user_post  flex-col`}>

    <div className={`${ !darkTheme ?'bg-indigo-900 text-slate-300':''} mt-3 w-[88vw]`}>
    

      <div className={`flex flex-row text-xl m-1 text-blue-900 ${!darkTheme ?'text-slate-200':''} `}>
        <MdAddPhotoAlternate className="mt-1 m-1" />
        <p className="m-0"> Upload </p>
      </div>
      <div className="divider m-0"></div>
     {loading && <Loading text1='please ,wait a moment ,' text="uploading" /> }
     { !loading && <><div className="flex ml-12 mb-2 " onClick={handleRef}>
        <IoAdd className="text-3xl" onClick={handleRef} />
        <p className="text-xl mr-2">Add posts</p>
        <input
          className="hidden"
          ref={refButton}
          type="file"
          multiple // Allows selecting multiple files
          onChange={handleFileChange}
        />
      </div>
      <div className="h-fit m-3 flex flex-row  ">
        {selectedFiles.length != 0 &&
          selectedFiles.map((f) => (
            <img
              key={f.name}
              className="h-48"
              src={URL.createObjectURL(f)}
              alt="imae"
            />
          ))}
      </div>
      <div className="mb-2 ml-12">
        <span>caption : </span>{" "}
        <input
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className={` ${!darkTheme ? 'bg-indigo-950' :''} w-34 ml-2 pl-2 `}
          type="text"
        />
      </div>
      <button
        className="bg-indigo-700 text-white p-2 rounded-md opacity-80 ml-14  h-fit"
        onClick={handleFileUpload}
      >
        Upload
      </button></>}
    </div>
    </div>
    {message && <div   >

      <MessagePop text='uploaded post successfully !' />
    </div>}
    </>
  );
}

export default AddPost;
