import { artifacts, getArtifact } from "@/data/artifacts";
import { states, getState } from "@/data/states";

// Central helpers. UI + search + future AI all use these —
// so we never scatter filtering logic inside components.

export function getArtifactsByGallery(galleryId: string) {
  return artifacts.filter((a) => a.galleryId === galleryId);
}

export function getArtifactsByState(stateId: string) {
  const state = getState(stateId);
  if (!state) return [];
  return state.artifactIds
    .map((id) => getArtifact(id))
    .filter((a) => a !== undefined);
}

export function getRelatedArtifacts(artifactId: string) {
  const art = getArtifact(artifactId);
  if (!art) return [];
  return art.relatedIds
    .map((id) => getArtifact(id))
    .filter((a) => a !== undefined);
}

// Simple global search for M6. Searches name, period, state, category.
export function searchMuseum(query: string) {
  const q = query.trim().toLowerCase();
  if (q.length < 2) return { artifacts: [], states: [] };

  const matchedArtifacts = artifacts.filter((a) =>
    [a.name, a.period, a.category, a.description, ...a.stateIds]
      .join(" ")
      .toLowerCase()
      .includes(q)
  );

  const matchedStates = states.filter((s) =>
    [s.name, s.capital, ...s.art, ...s.dance, ...s.festivals]
      .join(" ")
      .toLowerCase()
      .includes(q)
  );

  return { artifacts: matchedArtifacts, states: matchedStates };
}

export { artifacts, states, getArtifact, getState };
