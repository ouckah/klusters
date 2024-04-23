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
  const [errorMessage, setErrorMessage] = useState("");

  {
    /* Graph Initialization */
  }
  const INITIAL_POINT_AMOUNT = 5;
  const MAX_LENGTH = 100;
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

  const DEFAULT_K = 3;
  const [K, setK] = useState(DEFAULT_K);

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

    setErrorMessage("");
  };

  const removePoint = () => {
    setPoints((prevPoints) => {
      if (prevPoints.length > INITIAL_POINT_AMOUNT) {
        const removedPoint = prevPoints[prevPoints.length - 1];
        setClusters((prevClusters) => {
          const updatedClusters = prevClusters.map((cluster) =>
            cluster.filter((point) => point !== removedPoint)
          );
          return updatedClusters.filter((cluster) => cluster.length > 0);
        });
        console.log("Last point removed");
        return prevPoints.slice(0, prevPoints.length - 1);
      }
      return prevPoints;
    });

    setErrorMessage("");
  };

  const regeneratePoints = () => {
    const generatedPoints = generatePoints();
    setPoints(generatedPoints);
    setClusters([generatedPoints]);

    setErrorMessage("");
  };

  {
    /* K-Cluster Process */
  }
  const startKClusterProcess = () => {
    if (points.length < K) {
      setErrorMessage(
        `The amount of points (${points.length}) is less than K (${K}). Please add more points.`
      );
    } else {
      const [clusters, centroids] = k_clusters(points, K);
      setClusters(clusters);
      setErrorMessage(""); // Clear any previous error message
    }
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
          <XAxis dataKey="x" range={[0, MAX_LENGTH]} type="number" />
          <YAxis dataKey="y" range={[0, MAX_LENGTH]} type="number" />
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
      <div
        style={{ marginBottom: "20px" }}
        className="flex flex-col justify-center items-center"
      >
        <label htmlFor="kValue">Select K Value: </label>
        <input
          id="kValue"
          type="range"
          min="2"
          max="8"
          value={K}
          onChange={(e) => setK(Number(e.target.value))}
        />
        <span>{K}</span>
        {errorMessage && <div className="text-red-500">{errorMessage}</div>}
      </div>
      <div className="flex flex-col md:flex-row gap-12">
        <button
          onClick={regeneratePoints}
          className="mt-20 md:mt-0 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Regenerate Data
        </button>
        <button
          onClick={startKClusterProcess}
          className="my-20 md:my-0 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Start K-Cluster Process
        </button>
      </div>
    </>
  );
};
