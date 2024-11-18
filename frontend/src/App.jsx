import React , {useEffect} from 'react';


import ContextProvider from './hooks/Context.jsx'
import {BrowserRouter as  Router ,Routes , Route, useNavigate} from 'react-router-dom';
import Home from './pages/Home/index.jsx';
import Story from './pages/Strory/index.jsx';
import Games from './pages/Home/games.jsx';
import Profile from './pages/Profile/Profile.jsx';
import './index.css'
import NavBar from './pages/NavBar/index.jsx';
 
import UserWholeInfo from './pages/extras/UserwholeInfo';
import Chat from './pages/auth/Chat.jsx';
import ChatHome from './pages/Chats/index.jsx';
import AddPost from './pages/Home/addPost.jsx';
import Post from './pages/Home/post/posts.jsx';
import Additional from './pages/Home/addtional.jsx';
import Explore from './pages/Home/explore.jsx';
import UserInfo from './hooks/UserInfo.js';
import SearchPage from './pages/extras/searchPage.jsx';
import VideoPage from './pages/extras/callComponents/videoPage.jsx';
import { useCookies } from 'react-cookie';
import Login from './pages/Authorization/login.jsx';
import Register from './pages/Authorization/register.jsx';




function App() {
 
  const [cookies, ] = useCookies(["access_token"]);
  const {data , loading } = UserInfo(localStorage.getItem('lastChackedUser'))
  const {data : user , loading : userLoading} = UserInfo(localStorage.getItem('search_user'));
    
<<<<<<< HEAD
  
=======
 
>>>>>>> 48194c4e153401851b2fa462b9f9d21187b2c2b6
    return (
      <>
     <Router>
      <ContextProvider>
      <NavBar/>
     <Routes>
     <Route path="/login" element={<Login/>}  />
     <Route path="/register" element={<Register/>}  />
      <Route path="/" element={<Home/>}  >

        <Route index element={<Post/>} />
          <Route path='/explore'  > 
          <Route index element={<Explore/>} />
          <Route path='/explore/search' element={<SearchPage/>} />
        </Route>

      
        <Route path='/videoCall/:id' element={<VideoPage/>} />
        <Route path='/add_post' element={<AddPost/>} />
        <Route path='/games' element={<Games/>} />
        <Route path='/more' element={<Additional/>} />
        </Route>
        
        <Route path="/chat" element={<Chat/>} > 
        <Route index element={<ChatHome/>} />
        <Route path='/chat/:id' element={<ChatHome/>} />
        <Route path="/chat/profile/:id" element={loading ? <span>loading...</span> :< UserWholeInfo data={data} navigateTo="/chat" /> } />
        </Route > 
        <Route path="/story" element={<Story/>} />
        <Route path="/profile" element={<Profile/> } />
        <Route path="/userProfile/:id"  element={userLoading ? <span>loading...</span> :< UserWholeInfo data={user} navigateTo="/search" /> } />

      </Routes>
        
       
        
      </ContextProvider>
      
     </Router>
      
</>
)
  
 
   
  }

         


export default App;
