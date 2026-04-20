export interface Exam {
  id: number;
  title: string;
  duration: number;
  createdBy: string;
}

export interface CreateExamRequest {
  title: string;
  duration: number;
}
