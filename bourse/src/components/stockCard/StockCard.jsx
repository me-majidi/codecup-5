import React from "react";

function StockCard({ name, values }) {
  const currVal = values[values.length - 1];
  const lastVal = values[values.length - 2];
  let percentage;
  let direction;

  if (lastVal) {
    percentage = (currVal - lastVal) / lastVal;
    if (percentage < 0) {
      direction = "-";
    } else {
      direction = "+";
    }
    percentage = Math.abs(percentage).toFixed(2);
  } else {
    direction = "+";
    percentage = "...";
  }

  return (
    <div className="stockContainer">
      <div className="header">
        <div
          id="arrow"
          data-testid="arrow-element"
          className={direction === "+" ? "up" : "down"}
        />
        <div className="title" data-testid="title-element">
          {name}
        </div>
      </div>
      <div className="info">
        <div
          id="percentage"
          data-testid="percentage-element"
          className={direction === "+" ? "percentage_up" : "percentage_down"}
        >
          {direction}
          {percentage}%
        </div>
        <div className="price" data-testid="price-element">
          {currVal}
        </div>
      </div>
    </div>
  );
}
export default StockCard;
