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
  {
    /* Graph Initialization */
  }
  const INITIAL_POINT_AMOUNT = 4;
  const generatePoints = () => {
    let points = [];
    for (let i = 0; i < INITIAL_POINT_AMOUNT; i++) {
      let x = Math.floor(Math.random() * 501); // Generates a random number between 0 and 500
      let y = Math.floor(Math.random() * 501); // Generates a random number between 0 and 500
      points.push({ x, y });
    }
    return points;
  };

  const [points, setPoints] = useState(generatePoints);

  {
    /* Point Logic */
  }
  const addPoint = (e) => {
    if (e) {
      const { xValue: x, yValue: y } = e;
      const newPoint = { x, y };

      // Assuming data1 is the dataset we want to add the point to
      setPoints((prevPoints) => [...prevPoints, newPoint]);
      console.log("Point added:", newPoint);
    }
  };

  const removePoint = () => {
    setPoints((prevPoints) => {
      if (prevPoints.length > INITIAL_POINT_AMOUNT) {
        console.log("Last point removed");
        return prevPoints.slice(0, prevPoints.length - 1);
      }
      return prevPoints;
    });
  };

  {
    /* Undo Listener */
  }
  const handleUndo = (e) => {
    if (e.ctrlKey && e.key === "z") {
      removePoint();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleUndo);

    return () => {
      window.removeEventListener("keydown", handleUndo);
    };
  }, []);

  const regeneratePoints = () => {
    setPoints(generatePoints());
  };

  {
    /* Render */
  }
  return (
    <>
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
          className="select-none"
        >
          <CartesianGrid horizontal={false} vertical={false} />
          <XAxis dataKey="x" range={[0, 500]} type="number" />
          <YAxis dataKey="y" range={[0, 500]} type="number" />
          <Tooltip cursor={{ strokeDasharray: "3 3" }} />
          <Scatter data={points} fill="#eeeeee" />
        </ScatterChart>
      </ResponsiveContainer>
      <button onClick={regeneratePoints} style={{ marginTop: "20px" }}>
        Regenerate Data
      </button>
    </>
  );
};
