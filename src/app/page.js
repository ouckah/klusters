"use client";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <header className="text-5xl font-bold p-5 text-center flex flex-col items-center">
          Klusters
        </header>
        <header className="text-4xl font-bold p-5 text-center">
          Algorithm Showcase
        </header>
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-5">
          <article className="border rounded-lg p-4 flex flex-col items-center">
            <h2 className="font-semibold text-xl">Clustering Algorithms</h2>
            <p className="text-md p-2">
              Discover how clustering algorithms like K-Means, DBSCAN, and
              Hierarchical Clustering group data into clusters.
            </p>
            <button
              className="mt-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => (window.location.href = "/clustering")}
            >
              Learn More
            </button>
          </article>

          {/* TODO: add these articles */}
          <article className="border rounded-lg p-4 flex flex-col items-center opacity-50">
            <h2 className="font-semibold text-xl">Data Structures</h2>
            <p className="text-md p-2">
              Explore fundamental data structures like Arrays, Linked Lists, and
              Trees. (Coming Soon)
            </p>
            <button
              className="mt-auto bg-gray-500 text-white font-bold py-2 px-4 rounded"
              disabled
            >
              Learn More
            </button>
          </article>
          <article className="border rounded-lg p-4 flex flex-col items-center opacity-50">
            <h2 className="font-semibold text-xl">Sorting Algorithms</h2>
            <p className="text-md p-2">
              Explore a variety of sorting algorithms like Quick Sort, Merge
              Sort, and Bubble Sort. (Coming Soon)
            </p>
            <button
              className="mt-auto bg-gray-500 text-white font-bold py-2 px-4 rounded"
              disabled
            >
              Learn More
            </button>
          </article>
          <article className="border rounded-lg p-4 flex flex-col items-center opacity-50">
            <h2 className="font-semibold text-xl">Search Algorithms</h2>
            <p className="text-md p-2">
              Dive into search algorithms including Binary Search, Linear
              Search, and more. (Coming Soon)
            </p>
            <button
              className="mt-auto bg-gray-500 text-white font-bold py-2 px-4 rounded"
              disabled
            >
              Learn More
            </button>
          </article>
          <article className="border rounded-lg p-4 flex flex-col items-center opacity-50">
            <h2 className="font-semibold text-xl">Graph Algorithms</h2>
            <p className="text-md p-2">
              Get to know graph algorithms including Depth First Search, Breadth
              First Search, and more. (Coming Soon)
            </p>
            <button
              className="mt-auto bg-gray-500 text-white font-bold py-2 px-4 rounded"
              disabled
            >
              Learn More
            </button>
          </article>
          <article className="border rounded-lg p-4 flex flex-col items-center opacity-50">
            <h2 className="font-semibold text-xl">Pathfinding Algorithms</h2>
            <p className="text-md p-2">
              Understand how algorithms like A* and Dijkstra&apos;s algorithm
              find the shortest path. (Coming Soon)
            </p>
            <button
              className="mt-auto bg-gray-500 text-white font-bold py-2 px-4 rounded"
              disabled
            >
              Learn More
            </button>
          </article>
          <div className="col-span-full mt-8 text-center">
            <h3 className="text-2xl font-bold">Welcome to Klusters</h3>
            <p className="text-md p-2">
              Your journey into the fascinating world of algorithms begins here.
              Explore, learn, and master the art of problem-solving through our
              curated collection of algorithmic challenges and tutorials.
              Whether you&apos;re a beginner or an experienced coder,
              there&apos;s something here for everyone. Dive in and start your
              adventure today!
            </p>
            <p className="text-md p-2 mt-4">
              At Klusters, we believe in the power of algorithms to transform
              and innovate. Our platform offers a wide range of resources
              designed to enhance your understanding and application of
              algorithms. From detailed guides on algorithmic strategies to
              interactive coding challenges, we provide all the tools you need
              to become an algorithmic expert. Join our community of passionate
              coders and embark on a journey of continuous learning and
              improvement.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
