export enum DaysReturnTypes {
  OPTIONS = "list",
  INDEX = "index",
}

export interface Answer {
  chosenDay: string;
}

export interface DayOption {
  name: string;
  value: string;
}

export interface DayIndex {
  index: number;
  path: string;
}

export interface Day {
  execute(): void;
}
