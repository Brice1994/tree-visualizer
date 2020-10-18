import React from "react";
import "./Arrow.css";
import { CELL_SIZE } from "./Visualizer";
export default class Arrow extends React.Component<any, any> {
  render() {
    const { x1, y1, x2, y2 } = this.props;
    return (
      <div>
        <div>
          <svg id="connectors" height="100%" width="100%">
            <defs>
              <marker
                id="markerArrow"
                markerWidth="10"
                markerHeight="10"
                refX="2"
                refY="6"
                orient="auto"
              >
                <path d="M2,2 L2,11 L10,6 L2,2" />
              </marker>
            </defs>
            <line x1={x1} y1={y1} x2={x2} y2={y2} className="arrow" />
          </svg>
        </div>
      </div>
    );
  }
}
