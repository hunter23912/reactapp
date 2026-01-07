import React, { Component } from "react";

class Solution extends Component {
  state = {
    solutions: [
      {
        number: 1164,
        title: "加工零件",
        views: 2930,
      },
      {
        number: 1165,
        title: "加工零件",
        views: 2931,
      },
      {
        number: 1166,
        title: "加工零件",
        views: 2932,
      },
      {
        number: 1167,
        title: "加工零件",
        views: 2933,
      },
      {
        number: 1168,
        title: "加工零件",
        views: 2934,
      },
    ],
  };

  handleDelete = (s) => {
    const solutions = this.state.solutions.filter((solution) => solution !== s);
    this.setState({ solutions });
  };

  render() {
    return (
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>标题</th>
            <th>阅读</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {this.state.solutions.map((solution, index) => (
            <tr key={index}>
              <td>{solution.number}</td>
              <td>{solution.title}</td>
              <td>{solution.views}</td>
              <td>
                <button onClick={() => this.handleDelete(solution)} className="btn btn-danger">
                  删除
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default Solution;
