export const linearScaling = (baseXP: number, times: number) =>
  Math.floor(baseXP + times * 10);

export const exponentialScaling = (baseXP: number, times: number) =>
  Math.floor(baseXP * Math.pow(1.25, times));

export const plateauScaling = (baseXP: number, times: number) =>
  Math.floor(baseXP + Math.min(times, 5) * 15);
