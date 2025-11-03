import { Plant } from "./types";

export function cosineSimilarity(a: number[], b: number[]): number {
  const dotProduct = a.reduce((sum, val, i) => sum + val * b[i], 0);
  const magnitudeA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
  const magnitudeB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
  return dotProduct / (magnitudeA * magnitudeB);
}

export function clusterPlants(plants: Plant[]): Plant[][] {
  if (plants.length === 0) return [];

  const clusters: Plant[][] = [];
  const visited = new Set<string>();

  plants.forEach((plant) => {
    if (visited.has(plant.id)) return;

    const cluster: Plant[] = [plant];
    visited.add(plant.id);

    plants.forEach((otherPlant) => {
      if (visited.has(otherPlant.id)) return;

      const similarity = cosineSimilarity(
        plant.personalityVector,
        otherPlant.personalityVector
      );

      if (similarity > 0.7) {
        cluster.push(otherPlant);
        visited.add(otherPlant.id);
      }
    });

    clusters.push(cluster);
  });

  return clusters;
}

export function getSimilarPlants(plant: Plant, allPlants: Plant[], limit = 3): Plant[] {
  return allPlants
    .filter((p) => p.id !== plant.id)
    .map((p) => ({
      plant: p,
      similarity: cosineSimilarity(plant.personalityVector, p.personalityVector),
    }))
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, limit)
    .map((item) => item.plant);
}
