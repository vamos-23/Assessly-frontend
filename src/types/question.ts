export type QuestionType = "SCQ" | "MCQ";

export interface Question {
  id: number;
  questionText: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctAnswers: string[];
  type: QuestionType;
  examId: number;
}

export interface CreateQuestionRequest {
  questionText: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctAnswers: string[];
  type: QuestionType;
}
