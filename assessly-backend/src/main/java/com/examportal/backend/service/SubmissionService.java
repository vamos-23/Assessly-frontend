package com.examportal.backend.service;

import com.examportal.backend.dto.*;
import com.examportal.backend.entity.*;
import com.examportal.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class SubmissionService {
    @Autowired private SubmissionRepository submissionRepository;
    @Autowired private AnswerRepository answerRepository;
    @Autowired private QuestionRepository questionRepository;
    @Autowired private ExamRepository examRepository;

    @Transactional
    public Submission submitExam(SubmitExamRequest request, String email) {
        Exam exam = examRepository.findById(request.getExamId()).orElseThrow(() -> new RuntimeException("Exam not found"));
        Submission submission = new Submission();
        submission.setExam(exam);
        submission.setUserEmail(email);

        final Submission savedSubmission = submissionRepository.save(submission);

        double totalScore = 0;
        List<Long> questionIds = request.getAnswers().stream()
                .map(AnswerRequest::getQuestionId)
                .distinct().toList();

        Map<Long, Question> questionMap = questionRepository.findAllById(questionIds).stream()
                .collect(Collectors.toMap(Question::getId, q -> q));

        List<Answer> answersToSave = new ArrayList<>();

        for (AnswerRequest ansReq : request.getAnswers()) {
            Question q = questionMap.get(ansReq.getQuestionId());
            if (q == null) throw new RuntimeException("Invalid question ID: " + ansReq.getQuestionId());

            List<String> correct = q.getCorrectAnswers();
            List<String> selected = ansReq.getSelectedOptions();

            totalScore += evaluateAnswer(q, correct, selected);

            Answer answer = new Answer();
            answer.setQuestion(q);
            answer.setSubmission(savedSubmission);
            answer.setSelectedOptions(selected);
            answersToSave.add(answer);
        }
        double roundedScore = Math.round(totalScore * 100.0) / 100.0;
        savedSubmission.setScore(roundedScore);
        answerRepository.saveAll(answersToSave);
        return submissionRepository.save(savedSubmission);
    }

    private double evaluateAnswer(Question q, List<String> correct, List<String> selected) {
        if (selected == null || correct == null || selected.isEmpty()) return 0;

        if (q.getType() == QuestionType.SCQ) {
            return (selected.size() == 1 && correct.get(0).equalsIgnoreCase(selected.get(0))) ? 1.0 : 0.0;
        }

        Set<String> correctSet = new HashSet<>(correct);
        Set<String> selectedSet = new HashSet<>(selected);

        long correctSelected = selectedSet.stream().filter(correctSet::contains).count();
        long wrongSelected = selectedSet.stream().filter(opt -> !correctSet.contains(opt)).count();
        double positive = (double) correctSelected / correctSet.size();
        double negative = (double) wrongSelected / 4.0;

        return Math.max(positive - negative, 0);
    }

    public Submission getSubmissionById(Long id) {
        return submissionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Submission not found"));
    }

    public List<Submission> getAllSubmissions() {
        return submissionRepository.findAll();
    }
    public List<Submission> getSubmissionsByExam(Long examId) {
        return submissionRepository.findByExamId(examId);
    }
    public List<Submission> getByUser(String email) {
        return submissionRepository.findByUserEmail(email);
    }
}
