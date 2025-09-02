export interface Question {
  question: string;
  options: string[];
  answer: number;
}

export enum Difficulty {
  Easy = "EASY",
  Mediun = "MEDIUM",
  Hard = "HARD",
  Impossible = "IMPOSSIBLE",
}
