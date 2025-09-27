export interface Question {
  question: string;
  options: string[];
  answer: number;
  cry: string | undefined;
  image: string | undefined;
  name: string;
  id: number;
  alternateNames: string[];
  description: string;
}
