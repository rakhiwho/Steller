import React ,{createContext, useContext, useState} from "react";


 export const useLocalContext = ()=>{
  return useContext(localContext);
 }

 const defaultVal = {
   selected : "",
   setSelected : ()=>null,
   selectedPage:"",
   setSelectedPage :()=>null
  

};

 const localContext = createContext(defaultVal)



function LocalContext({children}) {

    const [selected , setSelected] = useState();
    const [selectedPage , setSelectedPage] = useState("explore");



const contextValue = {
selected ,
setSelected,
selectedPage,
setSelectedPage
}


  return (
    <localContext.Provider value={contextValue}>
    {children}
  </localContext.Provider>
  )
}
export {localContext}
export default LocalContext
