export interface Question {
  question: string;
  options: string[];
  answer: number;
  selectedAnswer: number | null;
  inputAnswer: string | null;
  cry: string | undefined;
  image: string | undefined;
  name: string;
  id: number;
  alternateNames: string[];
  description: string;
}
