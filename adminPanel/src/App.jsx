import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from "react-router-dom";
import AddSong from "./pages/AddSong.jsx";
import ListSong from "./pages/ListSong.jsx";
import AddAlbum from "./pages/AddAlbum.jsx";

import ListAlbum from "./pages/ListAlbum.jsx";
import SideBar from "./components/SideBar.jsx";
import Navbar from "./components/Navbar.jsx";

export const url = "http://localhost:4000"

const App = () => {
  return (
    <div className="flex items-start min-h-screen">
      <ToastContainer />
      <SideBar/>
      <div className="flex-1 h-screen overflow-y-scroll bg-[#F3FFF7]">
        <Navbar/>
        <div className="pt-8 pl-5 sm:pt-12 sm:pl-12">
          <Routes>
            <Route path="/add-song" element={<AddSong />} />
            <Route path="/list-songs" element={<ListSong />} />
            <Route path="/add-album" element={<AddAlbum />} />
            <Route path="/list-albums" element={<ListAlbum />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
