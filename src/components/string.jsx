import React, { Component } from "react";
import { connect } from "react-redux";

class String extends Component {
  state = {};

  render() {
    return (
      <>
        <h3>String: </h3>
        <div>{this.props.string}</div>
        <button onClick={() => this.props.add(10)}>加</button>
        <button onClick={() => this.props.sub(1)}>减</button>
      </>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    string: state.string,
  };
};

const mapDispatchToProps = {
  add: (x) => {
    return {
      type: "add",
      value: x,
    };
  },
  sub: (x) => {
    return {
      type: "sub",
      value: x,
    };
  },
};

export default connect(mapStateToProps, mapDispatchToProps)(String);
