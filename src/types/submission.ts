export interface Submission {
  id: number;
  userEmail: string;
  score: number;
  exam: {
    id: number;
    title: string;
  };
}
