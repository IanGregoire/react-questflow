import type { XPGrowthFn } from "./xpGrowth";

// Basic linear curve
export const linear: XPGrowthFn = (level) => 50 * level;

// Soft exponential curve
export const exponential: XPGrowthFn = (level) =>
  Math.floor(100 * Math.pow(1.25, level - 1));

// Hard exponential (for harder leveling)
export const steepExponential: XPGrowthFn = (level) =>
  Math.floor(100 * Math.pow(1.4, level - 1));

// Logarithmic: fast early levels, slow later
export const logarithmic: XPGrowthFn = (level) =>
  Math.floor(200 * Math.log2(level + 1));

// RPG-like curve (custom)
export const rpg: XPGrowthFn = (level) =>
  Math.floor(50 + 25 * level + Math.pow(level, 2.2));


// Default
export const defaultXPGrowth = exponential;
