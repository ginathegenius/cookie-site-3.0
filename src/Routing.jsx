import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./containers/Home";
// import NotFound from "./containers/NotFound";
// import Pignoli from "./containers/Pignoli";
import Cookies from "./containers/Cookies";

export default function Routing() {
  return (
    <Routes>        
      <Route path="/"  element={<Home/>} />
      <Route path="/cookie-library"  element={<Cookies />}/>
    </Routes>
  );
}