import React, { Component } from "react";
import { Outlet } from "react-router-dom";

class Linux extends Component {
  state = {};
  render() {
    return (
      <>
        <h1>Linux</h1>
        <hr />
        <Outlet />
      </>
    );
  }
}

export default Linux;
