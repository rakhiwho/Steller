import React, { useContext,useEffect ,  useRef, useState } from 'react'
import useChange_userInfo from '../../hooks/useChange_userInfo'
import useGetUser_info from '../../hooks/useGetUser_info';
import { context } from '../../hooks/Context'
import { MdEdit } from "react-icons/md";
import MessagePop from '../extras/MessagePop';


function Update(  ) {
    const {setChange}=useContext(context);
    const {data , loading} =  useGetUser_info();
    const {defaultPfp , darkTheme}=  useContext(context)
    const [userName , setUserName] = useState(data?.userName)
    const [password , setpassword] = useState("")
    const [about , setAbout] = useState("")
    const [gender , setGender] = useState("")
    const [pfp , setPfp] = useState();
    const [profile , setProfile] = useState(data?.profilePic || defaultPfp) ;
    const refButton =  useRef("")
    const {changeInfo}=  useChange_userInfo(userName, password,pfp,  gender ,about);
    const [message , setMessage]= useState("")
    
    const handleSubmit = async (e) => {
        e.preventDefault();
   
        if (userName ===undefined ||( userName != "" && userName.toLowerCase().startsWith(" "))) {
            setMessage("Username and password can't be blank");
            return;
        }

        try {
        await changeInfo();
        setChange(false);
        } catch (error) {
            console.error('Error updating user info:', error);
        }
    };
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPfp(file)
            const fileUrl = URL.createObjectURL(file);
            setProfile(fileUrl);
        
        }
    };

    const handleInput = ()=>{
        refButton.current.click();
    }

    useEffect(() => {
        if(message != ""){
    
          const intervalId = setInterval(() => {
             setMessage("");
      
          }, 1500);
          return () => clearInterval(intervalId);
        }
      
        
      }, [message]);
  return (
    <>
      {loading && <form className={` ${!darkTheme ?'bg-indigo-950':''}`} onSubmit={handleSubmit} >
    <div  className={`${!darkTheme ?'':''} profile`}>
    <div className='edit-btn mb-2'>
        <button type='submit' >save Info</button>
       
       </div>
    <div className="profile-info">
    <div  className= {`avatar self-center  "" `} >
    <div className="w-28 h-28 contact-img rounded-full">
     <img src={profile}  />
     <MdEdit onClick={handleInput} className='absolute right-0 bottom-3 text-2xl text-indigo-800 ' />
    </div>
    <input className='hidden' 
      type="file"
      ref={refButton}    
      name='profilePic'
      onChange={handleFileChange}
      style={{ color:'white'}}
     id="" />
  </div >

      <div className="divider px-3"></div>
      <div className="info">
       <div className='info-details'>
       
       <input type="text"
        className=' bg-transparent text-slate-800 text-xl mb-2 rounded-sm' 
        placeholder={data.userName} value={userName}
         onChange={(e)=>setUserName(e.target.value)} name="" id="" />
       <input type="text" 
       value={gender} 
       placeholder='gender'
       onChange={(e)=>setGender(e.target.value)} 
       className=' bg-transparent text-md mb-2 rounded-sm text-slate-800 border-b-2' name="" id="" />
       </div>
      
      </div>
    </div>
    <h3>About YOU :</h3>
    <div className="profile-about">
     
   <input type="text" placeholder='write about yourself here'   value={about} onChange={e=>setAbout(e.target.value)} name="" id="" />
    </div>
    </div>
    </form>}
    { message !=undefined || message != ""  &&  <MessagePop text={message} />}
    </>
   
)
}

export default Update
