import { Routes, Route, Navigate } from "react-router-dom";
import { Home } from "../../pages/Home/Home";
import { Register } from "../../pages/Register/Register";
import { Login } from "../../pages/Login/Login";
import { Profile } from "../../pages/Profile/Profile";
import { Chat } from "../../pages/Chat/Chat";
import { ChatDetail } from "../../pages/ChatDetail/ChatDetail";
import { Users } from "../../pages/Users/Users";
import { UserProfileDetail } from "../../pages/UserProfileDetail/UserProfileDetail";

import { useLocation } from 'react-router-dom';
import { NavBar } from "../NavBar/NavBar";
import { Header } from "../Header/Header";


export const Body = () => {
const location=useLocation()
  
  return (

    <>

{location.pathname !== '/chatdetail' &&  (<><NavBar/> <Header/> </>)}
      
      <Routes>
        <Route path="*" element={<Navigate to={"/"} replace />} />
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/chats" element={<Chat />} />
        <Route path="/users" element={<Users />} />
        <Route path="/userdetail" element={<UserProfileDetail />} />
        <Route path="/chatdetail" element={<ChatDetail />} />
      </Routes>
     
      
      
    </>


  );
};