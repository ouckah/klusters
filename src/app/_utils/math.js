// normalization function for k-clusters
export const euclideanDistance = (point1, point2) => {
  return Math.sqrt(
    Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2)
  );
};

// algorithm to group points into k clusters
// @see https://en.wikipedia.org/wiki/K-means_clustering
export const k_clusters = (points, k) => {
  // initialize clusters
  const clusters = Array.from({ length: k }, () => []);

  // initialize centroids
  const centroids = [];
  while (centroids.length < k) {
    const randomIndex = Math.floor(Math.random() * points.length);
    if (!centroids.includes(points[randomIndex])) {
      centroids.push(points[randomIndex]);
    }
  }

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

  // return the clusters
  return clusters;
};
