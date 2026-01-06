import React, { Component } from "react";
import Navbar from "./navbar.jsx";
import Boxes from "./boxes.jsx";

class App extends Component {
  state = {
    boxes: [
      { id: 1, x: 1 },
      { id: 2, x: 2 },
      { id: 3, x: 3 },
      { id: 4, x: 4 },
    ],
  };

  componentDidMount() {
    console.log("App - Mounted");
  }

  constructor() {
    super();
    console.log("App Constructor");
  }

  handleClickLeft = (box) => {
    const boxesNew = [...this.state.boxes];
    const k = boxesNew.indexOf(box);
    boxesNew[k] = { ...boxesNew[k] }; // 这一步，才是两个对象脱钩
    boxesNew[k].x--; // 修改的是新对象，避免了直接修改state中的对象
    this.setState({ boxes: boxesNew });
  };

  handleClickRight = (box) => {
    const boxes = this.state.boxes.map((b) => (b == box ? { ...b, x: b.x + 1 } : b));
    this.setState({ boxes });
  };

  handleDelete = (boxId) => {
    console.log("handle delete", boxId);
    const boxes = this.state.boxes.filter((box) => box.id !== boxId);
    this.setState({ boxes });
  };

  handleReset = () => {
    const boxes = this.state.boxes.map((box) => {
      return { id: box.id, x: 0 };
    });
    this.setState({ boxes });
  };

  render() {
    console.log("App - Render");

    return (
      <>
        <Navbar boxesCount={this.state.boxes.filter((box) => box.x !== 0).length} />
        <div className="container">
          <Boxes
            boxes={this.state.boxes}
            onDelete={this.handleDelete}
            onClickLeft={this.handleClickLeft}
            onClickRight={this.handleClickRight}
            onReset={this.handleReset}
          />
        </div>
      </>
    );
  }
}

export default App;
