import api from "./axios";
import { type Exam, type CreateExamRequest } from "../types/exam";

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
