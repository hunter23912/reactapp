import React, { Component } from "react";
import Box from "./box.jsx";

// 无状态函数组件，只负责展示UI，不维护自己的state状态，通过props接收数据和回调，不做逻辑处理，结构简单，易于复用和测试
const Boxes = ({ onReset, boxes, onDelete, onClickLeft, onClickRight }) => {
  // 可以解构出来所有参数
  return (
    <>
      <button style={{ marginBottom: 10 }} className="btn btn-dark" onClick={onReset}>
        Reset
      </button>

      {boxes.map((box) => (
        <Box
          key={box.id}
          box={box}
          onDelete={onDelete}
          onClickLeft={() => onClickLeft(box)}
          onClickRight={() => onClickRight(box)}
        ></Box>
      ))}
    </>
  );
};

export default Boxes;
