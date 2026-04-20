export interface AnswerRequest {
  questionId: number;
  selectedOptions: string[];
}

export interface SubmitExamRequest {
  examId: number;
  answers: AnswerRequest[];
}
