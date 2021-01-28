import React from "react";

function Chart({ values }) {
  const lastVals = [...values].reverse().slice(0, 50);

  return (
    <div className="chartContainer">
      {lastVals.map((val, i, arr) => {
        let dir;
        if (i === 0) {
          dir = "+";
        } else {
          const diff = val - arr[i - 1];
          dir = diff >= 0 ? "+" : "-";
        }

        const height = (val / 7900000) * 300;

        return (
          <div
            key={i}
            className={`chart  ${dir === "+" ? "chart_up" : "chart_down"}`}
            style={{
              height: height + "px",
            }}
          ></div>
        );
      })}
    </div>
  );
}

export default Chart;
