import React, { Component } from "react";
import Navbar from "./navbar";
import Home from "./home";
import Linux from "./linux";
import Django from "./django";
import Web from "./web";
import WebContent from "./webContent";
import NotFound from "./notFound";
import { Routes, Route, Navigate } from "react-router-dom";

class App extends Component {
  state = {};
  render() {
    return (
      <>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/linux" element={<Linux />}>
              <Route path="homework" element={<h4>Linux Homework</h4>}></Route>
              <Route path="terminal" element={<h4>Linux Terminal</h4>}></Route>
              <Route path="*" element={<h4>Others</h4>}></Route>
            </Route>
            <Route path="/django" element={<Django />} />
            <Route path="/web" element={<Web />} />
            <Route path="/web/content" element={<WebContent />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" />} />
          </Routes>
        </div>
      </>
    );
  }
}

export default App;
