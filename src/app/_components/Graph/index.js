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

import { k_clusters } from "@/app/_utils/math";

export const Graph = () => {
  const K = 3;
  const DEFAULT_COLOR = "#eeeeee";
  const COLORS = [
    "#FF5733",
    "#33FF57",
    "#3357FF",
    "#FF33FB",
    "#33FFF6",
    "#F3FF33",
    "#FF8333",
    "#8D33FF",
  ];

  {
    /* Graph Initialization */
  }
  const INITIAL_POINT_AMOUNT = 5;
  const MAX_LENGTH = 500;
  const generatePoints = () => {
    let points = [];
    for (let i = 0; i < INITIAL_POINT_AMOUNT - 1; i++) {
      let x = Math.floor(Math.random() * MAX_LENGTH + 1);
      let y = Math.floor(Math.random() * MAX_LENGTH + 1);
      points.push({ x, y });
    }

    // keeps the graph a set size
    points.push({ x: MAX_LENGTH, y: MAX_LENGTH });
    return points;
  };

  const generatedPoints = generatePoints();
  const [points, setPoints] = useState(generatedPoints);
  const [clusters, setClusters] = useState([generatedPoints]);

  {
    /* Point Logic */
  }
  const addPoint = (e) => {
    if (e) {
      const { xValue: x, yValue: y } = e;
      const newPoint = { x, y };

      setPoints((prevPoints) => [...prevPoints, newPoint]);
      setClusters((prevClusters) => {
        const firstCluster = [...prevClusters[0], newPoint];
        return [firstCluster, ...prevClusters.slice(1)];
      });
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

  const regeneratePoints = () => {
    const generatedPoints = generatePoints();
    setPoints(generatedPoints);
    setClusters([generatedPoints]);
  };

  {
    /* K-Cluster Process */
  }
  const startKClusterProcess = () => {
    const clusters = k_clusters(points, K);
    setClusters(clusters);
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

  console.log(clusters);

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
          {clusters.length === 1 ? (
            <Scatter key={0} data={clusters[0]} fill={DEFAULT_COLOR} />
          ) : (
            clusters.map((cluster, index) => (
              <Scatter
                key={index}
                data={cluster}
                name={`Cluster ${index + 1}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))
          )}
        </ScatterChart>
      </ResponsiveContainer>
      <button onClick={regeneratePoints} style={{ marginTop: "20px" }}>
        Regenerate Data
      </button>
      <button onClick={startKClusterProcess} style={{ marginTop: "20px" }}>
        Start K-Cluster Process
      </button>
    </>
  );
};
