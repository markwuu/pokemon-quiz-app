export interface Question {
  question: string;
  options: string[];
  answer: number;
  cry: string | undefined;
  image: string | undefined;
  name: string;
}

export enum Difficulty {
  Easy = "Easy",
  Mediun = "Medium",
  Hard = "Hard",
  Impossible = "Impossible",
}
