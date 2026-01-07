import React, { Component } from "react";
import Number from "./number";
import String from "./string";

class App extends Component {
  state = {};
  render() {
    return (
      <>
        <Number />
        <hr />
        <String />
      </>
    );
  }
}

export default App;
