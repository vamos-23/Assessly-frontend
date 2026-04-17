package com.examportal.backend.service;

import com.examportal.backend.dto.*;
import com.examportal.backend.entity.*;
import com.examportal.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SubmissionService {

    @Autowired
    private SubmissionRepository submissionRepository;
    @Autowired
    private AnswerRepository answerRepository;
    @Autowired
    private QuestionRepository questionRepository;
    @Autowired
    private ExamRepository examRepository;

    public Submission submitExam(SubmitExamRequest request, String email) {

        Exam exam = examRepository.findById(request.getExamId())
                .orElseThrow(() -> new RuntimeException("Exam not found"));

        Submission submission = new Submission();
        submission.setExam(exam);
        submission.setUserEmail(email);

        submission = submissionRepository.save(submission);

        int score = 0;

        for (AnswerRequest ans : request.getAnswers()) {

            Question q = questionRepository.findById(ans.getQuestionId())
                    .orElseThrow(() -> new RuntimeException("Question not found"));

            var correct = q.getCorrectAnswers();
            var selected = ans.getSelectedOptions();

            boolean isCorrect = false;

            if (q.getType() == QuestionType.SCQ) {
                isCorrect = selected != null &&
                        selected.size() == 1 &&
                        correct.get(0).equalsIgnoreCase(selected.get(0));
            } else {
                isCorrect = selected != null &&
                        selected.containsAll(correct) &&
                        correct.containsAll(selected);
            }

            if (isCorrect) score++;

            Answer answer = new Answer();
            answer.setQuestion(q);
            answer.setSubmission(submission);
            answer.setSelectedOptions(selected);

            answerRepository.save(answer);
        }

        submission.setScore(score);
        return submissionRepository.save(submission);
    }
}