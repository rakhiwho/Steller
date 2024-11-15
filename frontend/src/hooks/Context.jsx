import React, { createContext, useEffect, useState } from 'react';
import { useCookies  } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
const defaultVal = {
  registered: false,
  setRegistered: () => null,
  logedIn: false,
  setLogedIn: () => null,
  user: '',
  setUser: () => null,
  change: false,
  setChange: () => null,
  visibleStory:false,
  setVisibleStory :()=>null,
  selectedPages : "",
  setSelectedPage : ()=>null,
  advanced :false ,
  setAdvanced :()=> null,
  defaultPfp : "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg",
  friend : [] ,
  setFriend : ()=>null,
  message : [],
  setMessage :()=>null,
  blur :false,
  setBlur :()=>null,
  active :"",
  setActive :()=>null,
  isCalling :false,
  setIsCalling:()=>null,
  isvoiceCalling :false,
  setIsvoiceCalling:()=>null,
  darkTheme :false,
  setDarkTheme :()=>null

};

const context = createContext(defaultVal); 

export const ContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [visibleStory , setVisibleStory]=useState(false);
  const [cookies ] = useCookies(['access_token']);
  const [registered, setRegistered] = useState(false);
  const [logedIn, setLogedIn] = useState(cookies.access_token != null);
  const [selectedPage , setSelectedPage] = useState("");
  const [user , setUser] = useState();
  const [change , setChange]= useState(false);
  const [advanced , setAdvanced] = useState(false)
  const [friend , setFriend] = useState([]);
  const [message , setMessage] = useState("");
  const [blur , setBlur] = useState(false);
  const [active , setActive] = useState("");
  const [isCalling , setIsCalling] = useState(false);
  const [isvoiceCalling , setIsvoiceCalling] = useState(false);
  const [darkTheme , setDarkTheme] = useState(!(localStorage.getItem('dark') !=null));
  useEffect(()=>{
    setAdvanced(false);
    setVisibleStory(false)
  
  },[useNavigate ])
  
const  defaultPfp= "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg"
  const contextValue = {
    registered,
    setRegistered,
    logedIn,
    setLogedIn,
    user,
    setUser,
    change,
    setChange,
    visibleStory,
    setVisibleStory
    ,
    selectedPage,
    setSelectedPage,
     advanced,
     setAdvanced,
    defaultPfp,
    friend,
    setFriend,
    message,
    setMessage,
    blur,
    setBlur,
    active,
    setActive,
    isCalling,
    setIsCalling,
    isvoiceCalling,
    setIsvoiceCalling,
    darkTheme,
    setDarkTheme
  };


  return (
    <context.Provider value={contextValue}>
      {children}
    </context.Provider>
  );
};

export default ContextProvider;
export { context };
