import lakesData from "@/data/lakes.json";
import type { Lake } from "./types";

const lakes: Lake[] = (lakesData as { lakes: Lake[] }).lakes;

export function getAllLakes(): Lake[] {
  return lakes;
}

export function getLake(id: string): Lake | undefined {
  return lakes.find((l) => l.id === id);
}

export const DEFAULT_LAKE_ID = "lake-murray-ok";
