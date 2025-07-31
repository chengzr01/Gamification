import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

import User from "./pages/User";
import Game from "./pages/Game";

function Home() {
  return <div className="App"></div>;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<Game />} />
        <Route path="/user" element={<User />} />
      </Routes>
    </Router>
  );
}

export default App;
