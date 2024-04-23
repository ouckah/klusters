// normalization function for k-clusters
export const euclideanDistance = (point1, point2) => {
  return Math.sqrt(
    Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2)
  );
};

// algorithm to group points into k clusters
// @see https://en.wikipedia.org/wiki/K-means_clustering
const EPSILON = 0.1;
const ITERATIONS = 5; // number of iterations to make sure we converge properly
export const k_clusters = (points, k) => {
  let final_clusters = [];
  let final_centroids = [];
  let final_wcss = Infinity;

  // iterate over multiple times to make sure we didnt
  // get a bad starting random centroids or
  // if we reached a saddle point
  for (let i = 0; i < ITERATIONS; i++) {
    const [clusters, centroids] = k_clusters_iteration(points, k);
    const wcss = calculateWCSS(clusters, centroids);
    if (wcss < final_wcss) {
      final_clusters = clusters;
      final_centroids = centroids;
      final_wcss = wcss;
    }
  }

  return [final_clusters, final_centroids];
};

const k_clusters_iteration = (points, k) => {
  // initialize clusters
  let clusters = Array.from({ length: k }, () => []);

  // initialize centroids to a random k points
  let centroids = [];
  while (centroids.length < k) {
    const randomIndex = Math.floor(Math.random() * points.length);
    if (!centroids.includes(points[randomIndex])) {
      centroids.push(points[randomIndex]);
    }
  }

  // main iteration loop
  let wcss_prev = Infinity;
  while (true) {
    // iterate over each point and calculate the distance
    // of each point to each centroid
    // add the point to the cluster in which the centroid is
    // minimal distance away
    points.forEach((point) => {
      const distances = centroids.map((centroid) =>
        euclideanDistance(point, centroid)
      );
      const minDistance = Math.min(...distances);
      const index = distances.indexOf(minDistance);
      if (clusters[index]) {
        clusters[index].push(point);
      } else {
        // In case the index is somehow out of bounds, which should not happen, but as a safeguard
        console.error(`Invalid cluster index: ${index}`);
      }
    });

    // check to see if WCSS has changed a significant amount
    // if it has not, we have reached a stable state
    const wcss = calculateWCSS(clusters, centroids);
    if (Math.abs(wcss - wcss_prev) < EPSILON) {
      break;
    }
    wcss_prev = wcss;

    // change centroids to the average of the points in each cluster
    centroids = clusters.map((cluster) => {
      const x =
        cluster.reduce((sum, point) => sum + point.x, 0) / cluster.length;
      const y =
        cluster.reduce((sum, point) => sum + point.y, 0) / cluster.length;
      return { x, y };
    });

    // reinitialize clusters
    clusters = Array.from({ length: k }, () => []);
  }

  return [clusters, centroids];
};

// calculates the WCSS (Within-Cluster Sum of Squares)
// used as a measure of the quality of the clustering
// @see https://support.minitab.com/en-us/minitab/help-and-how-to/statistical-modeling/multivariate/how-to/cluster-k-means/interpret-the-results/all-statistics-and-graphs/
const calculateWCSS = (clusters, centroids) => {
  let error = 0;

  // calculate the sum of the squared distances
  // between each point and its centroid
  clusters.forEach((cluster, i) => {
    cluster.forEach((point) => {
      error += Math.pow(euclideanDistance(point, centroids[i]), 2);
    });
  });

  return error;
};
