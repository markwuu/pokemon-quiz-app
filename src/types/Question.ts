export interface Question {
  question: string;
  options: string[];
  answer: number;
}

export enum Difficulty {
  Easy = "Easy",
  Mediun = "Medium",
  Hard = "Hard",
  Impossible = "Impossible",
}
