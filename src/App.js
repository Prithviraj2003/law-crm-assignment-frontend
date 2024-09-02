import React from "react";
import "./App.css";
import Navbar from "./Component/Header";
import Matters from "./Component/Matters/Matters";
import Clients from "./Component/Clients/Clients";
import { Route, Routes } from "react-router-dom";
function App() {
  console.log(process.env.REACT_APP_SERVER_URL)
  return (
    <div className="App">
      <Navbar />
      <div className="main-container">
        <Routes>
          <Route path="/" element={<Matters />} />
          <Route path="/clients" element={<Clients />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
