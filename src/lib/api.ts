import { Plant } from "./types";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/api";

export async function getAllPlants(): Promise<Plant[]> {
  const response = await fetch(`${API_URL}/plants`);
  if (!response.ok) throw new Error("Failed to fetch plants");
  return response.json();
}

export async function submitPlant(plant: Omit<Plant, "id" | "createdAt">): Promise<Plant> {
  const response = await fetch(`${API_URL}/plants`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(plant),
  });
  if (!response.ok) throw new Error("Failed to submit plant");
  return response.json();
}
