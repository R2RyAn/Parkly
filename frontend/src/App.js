import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import HomePage from "./HomePage";
import "./App.css";
import './index.css';
import ListingPage from "./ListingPage";

const App = () => {
  return (
    <Router>
      <div className="App-navbar">
        <div className="App-navbar-left">
          <Link to="/home" className="App-link">
            Home
          </Link>
          <Link to="/listing" className="App-link">
            Listing
          </Link>
        </div>
        <div className="App-navbar-right">
          <Link to="/login" className="App-link">
            Login
          </Link>
          <Link to="/signup" className="App-link">
            Signup
          </Link>
        </div>
      </div>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/listing" element={<ListingPage />} />
      </Routes>
    </Router>
  );
};

export default App;
