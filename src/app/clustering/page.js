"use client";

import { Graph } from "../_components/Graph";

function Clustering() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between md:p-24 p-0">
      <div className="flex flex-col z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <header className="text-5xl font-bold p-5 text-center flex flex-col items-center">
          Clustering Algorithms
        </header>
        <Graph />
      </div>
    </main>
  );
}

export default Clustering;
