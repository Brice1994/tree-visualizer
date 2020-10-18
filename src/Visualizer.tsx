import React from "react";
import "./Visualizer.css";
import Cell from "./Cell";
import Arrow from "./Arrow";

export const CELL_SIZE = 28;
const WIDTH = 1800;
const HEIGHT = 800;
const INITIAL_POS = {
  x: 30,
  y: 2,
};
class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  x: number;
  y: number;
  style: any;
  constructor(val = 0, x: number, y: number) {
    this.val = val;
    this.left = null;
    this.right = null;
    this.x = x;
    this.y = y;
  }
}
class Visualizer extends React.Component<any, any> {
  state: {
    root: TreeNode | null;
  } = {
    root: null,
  };

  insertNode(value: number, root: TreeNode) {
    let depth = 1;
    let width = 14;
    while (root.val !== value) {
      if (value < root.val) {
        if (root.left === null) {
          root.left = new TreeNode(value, root.x - width, root.y + depth * 1.5);
          break;
        } else {
          root = root.left;
          depth++;
          width = Math.floor(width * 0.6);
        }
      } else if (value > root.val) {
        if (root.right === null) {
          root.right = new TreeNode(
            value,
            root.x + width,
            root.y + depth * 1.5
          );
          break;
        } else {
          root = root.right;
          depth++;
          width = Math.floor(width * 0.6);
        }
      } else {
        break;
      }
      if (depth > 5) {
        return;
      }
    }
    this.setState(this.state);
  }
  handleInsert(event: any) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const form = document.getElementById("value-form") as HTMLFormElement;
    form!.reset();
    let content = formData.get("content")?.toString();
    if (!content) {
      console.log("! content");
      return;
    }
    let split = content
      .split(",")
      .map((s) => parseInt(s, 10))
      .filter((v) => typeof v === "number");
    if (split.length < 1) {
      return;
    }

    if (this.state.root === null) {
      let root = new TreeNode(split[0], INITIAL_POS.x, INITIAL_POS.y);
      this.setState({ root }, () => {
        for (let v of split.slice(1)) {
          this.insertNode(v, root);
        }
      });
    } else {
      for (let v of split) {
        this.insertNode(v, this.state.root);
      }
    }
  }
  dfs(node: TreeNode | null, op: (node: TreeNode) => any) {
    if (node === null) {
      return;
    }
    let seen: TreeNode[] = [node];
    let mapped = [];
    while (seen.length > 0) {
      let n: TreeNode = seen.shift() as TreeNode;
      mapped.push(op(n));
      if (n.left !== null) {
        seen.push(n.left);
      }
      if (n.right !== null) {
        seen.push(n.right);
      }
    }
    return mapped;
  }
  insertRandom() {
    let val = Math.floor(Math.random() * Math.floor(100));
    if (this.state.root === null) {
      this.setState({
        root: new TreeNode(val, INITIAL_POS.x, INITIAL_POS.y),
        done: false,
      });
    } else {
      this.insertNode(val, this.state.root);
    }
  }

  render() {
    let mapped = this.dfs(this.state.root, (n) => (
      <Cell style={n.style} val={n.val} x={n.x} y={n.y} key={`${n.val}`} />
    ));
    let arrows = this.dfs(this.state.root, (node) => {
      let a = [];
      if (node.left !== null) {
        let x1 = node.x * CELL_SIZE;
        let x2 = node.left.x * CELL_SIZE + CELL_SIZE;
        let y1 = node.y * CELL_SIZE + CELL_SIZE / 2;
        let y2 = node.left.y * CELL_SIZE;
        a.push(<Arrow x1={x1} x2={x2} y1={y1} y2={y2} />);
      }
      if (node.right !== null) {
        let x1 = node.x * CELL_SIZE + CELL_SIZE;
        let x2 = node.right.x * CELL_SIZE;
        let y1 = node.y * CELL_SIZE + CELL_SIZE / 2;
        let y2 = node.right.y * CELL_SIZE;
        a.push(<Arrow x1={x1} x2={x2} y1={y1} y2={y2} />);
      }
      return [...a];
    });
    return (
      <div>
        <div
          className="Board"
          style={{
            width: WIDTH,
            height: HEIGHT,
            backgroundSize: `${CELL_SIZE}px ${CELL_SIZE}px`,
          }}
        >
          {mapped}
          {arrows}
        </div>
        <div
          className="controls"
          style={{ color: "white", textAlign: "center" }}
        >
          <form id="value-form" onSubmit={(e) => this.handleInsert(e)}>
            Values to add (comma separated):{" "}
            <input id="content" name="content"></input>
            <button className="button">Add</button>
            <button onClick={() => this.insertRandom()} className="button">
              Random
            </button>
            <button
              onClick={() => this.setState({ root: null })}
              className="button"
            >
              Clear
            </button>
          </form>
        </div>
      </div>
    );
  }
}
export default Visualizer;
