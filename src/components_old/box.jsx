import React, { Component } from "react";

class Box extends Component {
  render() {
    return (
      <>
        <div style={this.getStyles()}>{this.toString()}</div>
        <button onClick={this.props.onClickLeft} className="btn btn-primary m-2">
          left
        </button>
        <button onClick={this.props.onClickRight} className="btn btn-success m-2">
          right
        </button>
        <button className="btn btn-danger m-2" onClick={() => this.props.onDelete(this.props.box.id)}>
          Delete
        </button>
      </>
    );
  }

  getStyles() {
    let styles = {
      width: 50,
      height: 50,
      backgroundColor: "lightblue",
      color: "white",
      textAlign: "center",
      lineHeight: "50px",
      borderRadius: "5px",
      marginLeft: this.props.box.x,
    };

    if (this.props.box.x === 0) {
      styles.backgroundColor = "orange";
    }

    return styles;
  }

  toString() {
    const { x } = this.props.box;
    return `x: ${x}`;
  }
}

export default Box;
