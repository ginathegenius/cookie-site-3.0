import { Route, Routes } from "react-router-dom";
import Cookies from "./containers/Cookies";

export default function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Cookies />} />
      <Route path="/cookie-library" element={<Cookies />} />
    </Routes>
  );
}