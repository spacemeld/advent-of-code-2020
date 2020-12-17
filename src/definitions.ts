export const Days = {
  "Day 1": 1,
} as const;

export interface Day {
  execute(): void;
}
