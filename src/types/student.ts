import type { QuestionType } from "./question";

export interface StudentExam {
  id: number;
  title: string;
  duration: number;
}

export interface StudentQuestion {
  id: number;
  questionText: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  type: QuestionType;
  exam?: StudentExam;
}

export interface AnswerRequest {
  questionId: number;
  selectedOptions: string[];
}

export interface SubmitExamRequest {
  examId: number;
  answers: AnswerRequest[];
  //totalQuestions: number,
}
