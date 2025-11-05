export function dot(a = [], b = []) {
  if (!a.length || !b.length) return 0;
  let s = 0;
  const n = Math.min(a.length, b.length);
  for (let i = 0; i < n; i++) s += (a[i] || 0) * (b[i] || 0);
  return s;
}

export function magnitude(v = []) {
  return Math.sqrt(v.reduce((acc, x) => acc + (x || 0) * (x || 0), 0));
}

export function cosineSimilarity(a = [], b = []) {
  const mag = magnitude(a) * magnitude(b);
  if (!mag) return 0;
  return dot(a, b) / mag;
}

export function combinedSimilarity(plantA, plantB, pWeight = 0.7) {
  const sWeight = 1 - pWeight;

  const aP = plantA.personalityVector || [];
  const bP = plantB.personalityVector || [];
  const simP = cosineSimilarity(aP, bP);

  const aS = plantA.songFeatures || [];
  const bS = plantB.songFeatures || [];
  // If either song vector empty, treat song similarity as 0
  const simS = (aS.length && bS.length) ? cosineSimilarity(aS, bS) : 0;

  return pWeight * simP + sWeight * simS;
}
