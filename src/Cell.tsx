import React from "react";
import { CELL_SIZE } from "./Visualizer";
export default class Cell extends React.Component<any, any> {
  render() {
    const { x, y, val, style } = this.props;
    return (
      <div
        className="Cell"
        style={{
          textAlign: "center",
          backgroundColor: "red",
          borderRadius: "50%",
          left: `${CELL_SIZE * x + 1}px`,
          top: `${CELL_SIZE * y + 1}px`,
          width: `${CELL_SIZE}px`,
          height: `${CELL_SIZE}px`,
          ...style
        }}
      >
        {val}
      </div>
    );
  }
}
