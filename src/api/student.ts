import api from "./axios";
import type {
  StudentExam,
  StudentQuestion,
  SubmitExamRequest,
} from "../types/student";
import type { Submission } from "../types/submission";

export const getStudentExams = async (): Promise<StudentExam[]> => {
  const res = await api.get("/student/exams");
  return res.data;
};

export const getExamQuestions = async (
  examId: number,
): Promise<StudentQuestion[]> => {
  const res = await api.get(`/student/exams/${examId}/questions`);
  return res.data;
};

export const submitExam = async (
  payload: SubmitExamRequest,
): Promise<Submission> => {
  const res = await api.post("/student/exams/submit", payload);
  return res.data;
};

export const getStudentResults = async (): Promise<Submission[]> => {
  const res = await api.get("/student/results");
  return res.data;
};
