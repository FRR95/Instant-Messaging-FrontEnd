import { Routes, Route, Navigate } from "react-router-dom";
import { Home } from "../../pages/Home/Home";
import { Register } from "../../pages/Register/Register";
import { Login } from "../../pages/Login/Login";
import { Profile } from "../../pages/Profile/Profile";
import { Chat } from "../../pages/Chat/Chat";
import { ChatDetail } from "../../pages/ChatDetail/ChatDetail";




export const Body = () => {
  return (
    <Routes>
      <Route path="*" element={<Navigate to={"/"} replace/>} />
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/chats" element={<Chat />} />
      <Route path="/chatdetail" element={<ChatDetail />} />
    </Routes>
  );
};