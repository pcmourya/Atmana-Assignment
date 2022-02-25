import React from "react";
import "./Category.css";

function Category(props) {
  return (
    <div className="category">
      {props.category.map((item) => (
        <button
          key={item}
          className="button"
          onClick={props.handleItemButton}
          value={item}
        >
          {item.charAt(0).toUpperCase() + item.slice(1)}
        </button>
      ))}
    </div>
  );
}

export default Category;
