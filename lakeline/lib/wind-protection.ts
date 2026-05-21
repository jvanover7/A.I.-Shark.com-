/**
 * Spot protection based on angular difference between wind direction
 * and the bearing of the shore the spot faces.
 *
 * - If wind blows from the protected side (e.g. land behind you),
 *   protection approaches 100.
 * - If wind blows directly across open water at the spot,
 *   protection approaches 0.
 *
 * shorelineBearing is the compass bearing (0-360) the open water lies
 * from the spot. Wind from the opposite bearing means land is between
 * the wind source and the spot — maximum protection.
 */
export function spotProtection(
  windDirDeg: number,
  shorelineBearing: number
): number {
  const windFrom = ((windDirDeg % 360) + 360) % 360;
  const openTo = ((shorelineBearing % 360) + 360) % 360;
  // Angular delta between where wind comes from and where the spot is exposed.
  // Wind blowing FROM the opposite of the open direction is full protection.
  const oppositeOfOpen = (openTo + 180) % 360;
  const delta = Math.min(
    Math.abs(windFrom - oppositeOfOpen),
    360 - Math.abs(windFrom - oppositeOfOpen)
  );
  // delta = 0 → fully protected (100). delta = 180 → fully exposed (0).
  return Math.round(100 - (delta / 180) * 100);
}

/**
 * Lookup the pre-computed fetch distance for a spot at the given wind bearing.
 * Falls back to a conservative default if the spot has no fetch table yet.
 */
export function fetchAtBearing(
  fetchDistances: number[] | null,
  windDirDeg: number
): number {
  if (!fetchDistances || fetchDistances.length !== 36) return 1500;
  const idx =
    Math.round(((((windDirDeg % 360) + 360) % 360) / 10)) % 36;
  return fetchDistances[idx];
}
