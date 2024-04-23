import React, { useState, useEffect } from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export const Graph = () => {
  const [data, setData] = useState([
    { x: 100, y: 200, z: 200 },
    { x: 120, y: 100, z: 260 },
    { x: 170, y: 300, z: 400 },
  ]);

  const addPoint = (e) => {
    if (e) {
      const { xValue: x, yValue: y } = e;
      const newPoint = { x, y };
      // Assuming data1 is the dataset we want to add the point to
      setData((prevData) => [...prevData, newPoint]);
      console.log("Point added:", newPoint);
    }
  };

  const handleUndo = (e) => {
    if (e.ctrlKey && e.key === "z") {
      setData((prevData) => prevData.slice(0, prevData.length - 1));
      console.log("Last point removed");
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleUndo);

    return () => {
      window.removeEventListener("keydown", handleUndo);
    };
  }, []);

  return (
    <ResponsiveContainer width="100%" height={800}>
      <ScatterChart
        width={800}
        height={800}
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}
        onClick={addPoint}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="x" type="number" />
        <YAxis dataKey="y" type="number" />
        <Tooltip cursor={{ strokeDasharray: "3 3" }} />
        <Scatter data={data} fill="#eeeeee" />
      </ScatterChart>
    </ResponsiveContainer>
  );
};
