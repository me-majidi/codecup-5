import React, { useEffect, useRef, useState } from "react";
import Chart from "./components/chart/Charts";
import StockCard from "./components/stockCard/StockCard";
import "./index.css";

function App({ intervalTime }) {
  const [name, setName] = useState("");
  const [values, setValues] = useState([]);
  const interval = useRef();

  useEffect(() => {
    interval.current = setInterval(() => {
      fetch("http://localhost:3001/stock")
        .then((res) => res.json())
        .then((res) => {
          if (res.name !== name) {
            setName(res.name);
          }
          setValues((vls) => [...vls, res.value]);
        });
    }, intervalTime);

    return () => {
      clearInterval(interval.current);
    };
  }, []);

  return (
    <div className="container">
      <StockCard name={name} values={values} />
      <Chart values={values} />
    </div>
  );
}

export default App;
