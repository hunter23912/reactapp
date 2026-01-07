import React, { Component } from "react";

// 函数式组件
const Navbar = (myprops) => {
  return (
    <nav className="navbar bg-body-tertiary">
      <div className="container-fluid">
        <span className="navbar-brand mb-0 h1">
          Navbar
          <span>Boxes Count: {myprops.boxesCount}</span>
        </span>
      </div>
    </nav>
  );
};

export default Navbar;
