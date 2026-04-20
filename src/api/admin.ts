import api from "./axios";
import type { Exam, CreateExamRequest } from "../types/exam";
import type { Question, CreateQuestionRequest } from "../types/question";
import type { AdminDashboardStats } from "../types/dashboardStats";
import type { Submission } from "../types/submission";

//Exam Managament APIs
export const getExams = async (): Promise<Exam[]> => {
  const res = await api.get("/admin/exams");
  return res.data;
};

export const createExam = async (payload: CreateExamRequest): Promise<Exam> => {
  const res = await api.post("/admin/exams", payload);
  return res.data;
};

export const deleteExam = async (id: number): Promise<void> => {
  await api.delete(`/admin/exams/${id}`);
};

//Question Management APIs
export const getQuestions = async (examId: number): Promise<Question[]> => {
  const res = await api.get(`/admin/questions/${examId}`);
  return res.data;
};

export const createQuestion = async (
  examId: number,
  payload: CreateQuestionRequest,
): Promise<Question> => {
  const res = await api.post(`/admin/questions/${examId}`, payload);
  return res.data;
};

export const deleteQuestion = async (questionId: number): Promise<void> => {
  await api.delete(`/admin/questions/${questionId}`);
};

export const updateQuestion = async (
  questionId: number,
  payload: CreateQuestionRequest,
): Promise<Question> => {
  const res = await api.put(`/admin/questions/${questionId}`, payload);
  return res.data;
};

export const getAdminStats = async (): Promise<AdminDashboardStats> => {
  const res = await api.get("/admin/dashboard/stats");
  return res.data;
};

//Submission Viewing APIs
export const getAllSubmissions = async (): Promise<Submission[]> => {
  const res = await api.get("/admin/submissions");
  return res.data;
};

export const getSubmissionsByExam = async (
  examId: number,
): Promise<Submission[]> => {
  const res = await api.get(`/admin/submissions/${examId}`);
  return res.data;
};
