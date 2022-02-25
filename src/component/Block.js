import React from "react";
import "./Block.css";

function Block(props) {
  return (
    <div className="block">
      <p className="joke">{props.joke}</p>
    </div>
  );
}

export default Block;
