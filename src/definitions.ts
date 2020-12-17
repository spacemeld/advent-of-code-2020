export interface Answer {
  chosenDay: string;
}

export interface DayOption {
  name: string;
  value: string;
}

export interface Day {
  execute(): void;
}
