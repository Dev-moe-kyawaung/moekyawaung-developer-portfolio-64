// Interstellar Warp-Drive Engineer Theme Tokens & Helpers

export const WARP_THEME = {
  void: "#03050c",
  deepSpace: "#060a17",
  hullPlate: "#0b1226",
  subpanel: "#101b38",
  
  // HUD Plasma Spectrum
  starlight: "#e2f1ff",
  warpCyan: "#38f9d7",
  tachyonBlue: "#4361ee",
  sublightAmber: "#ffb703",
  singularityViolet: "#b5179e",
  alertRed: "#ff3366",
  shieldGreen: "#06d6a0",
};

export function rgba(hex: string, alpha: number): string {
  const clean = hex.replace("#", "");
  const full = clean.length === 3 ? clean.split("").map((c) => c + c).join("") : clean;
  const num = parseInt(full, 16);
  return `rgba(${(num >> 16) & 255}, ${(num >> 8) & 255}, ${num & 255}, ${alpha})`;
}

export type MissionClassification = "PRIMARY_WARP" | "TACTICAL_CORE" | "DEEP_EXPLORATION" | "SYSTEM_STATION";

export const CLASSIFICATIONS: Record<MissionClassification, { label: string; color: string; warpFactor: string }> = {
  PRIMARY_WARP: { label: "WARP 9.8 CORE", color: "#38f9d7", warpFactor: "WARP 9.85" },
  TACTICAL_CORE: { label: "TACTICAL VECTOR", color: "#ffb703", warpFactor: "WARP 8.4" },
  DEEP_EXPLORATION: { label: "DEEP PROBE", color: "#b5179e", warpFactor: "WARP 6.9" },
  SYSTEM_STATION: { label: "SYSTEM RELAY", color: "#06d6a0", warpFactor: "SUBLIGHT" },
};
