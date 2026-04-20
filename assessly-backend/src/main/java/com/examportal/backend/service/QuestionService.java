package com.examportal.backend.service;

import com.examportal.backend.entity.Exam;
import com.examportal.backend.entity.Question;
import com.examportal.backend.entity.QuestionType;
import com.examportal.backend.repository.ExamRepository;
import com.examportal.backend.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuestionService {

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private ExamRepository examRepository;

    public Question addQuestion(Long examId, Question question) {
        Exam exam = examRepository.findById(examId)
                .orElseThrow(() -> new RuntimeException("Exam not found"));
        validateQuestion(question);
        question.setExam(exam);
        return questionRepository.save(question);
    }

    public List<Question> getQuestionsByExam(Long examId) {
        if (!examRepository.existsById(examId)) {
            throw new RuntimeException("Exam not found");
        }
        return questionRepository.findByExamId(examId);
    }

    public void deleteQuestion(Long id) {
        if (!questionRepository.existsById(id)) {
            throw new RuntimeException("Question not found");
        }
        questionRepository.deleteById(id);
    }

    public Question updateQuestion(Long id, Question updatedQuestion) {
        Question existing = questionRepository.findById(id).orElseThrow(() -> new RuntimeException("Question not found"));
        validateQuestion(updatedQuestion);
        existing.setQuestionText(updatedQuestion.getQuestionText());
        existing.setOptionA(updatedQuestion.getOptionA());
        existing.setOptionB(updatedQuestion.getOptionB());
        existing.setOptionC(updatedQuestion.getOptionC());
        existing.setOptionD(updatedQuestion.getOptionD());
        existing.setCorrectAnswers(updatedQuestion.getCorrectAnswers());
        existing.setType(updatedQuestion.getType());
        return questionRepository.save(existing);
    }

    private void validateQuestion(Question question) {
        if (question.getType() == QuestionType.SCQ && (question.getCorrectAnswers() == null ||
                        question.getCorrectAnswers().size() != 1)) {
            throw new RuntimeException("SCQ must have exactly one correct answer");
        }
        if (question.getType() == QuestionType.MCQ && (question.getCorrectAnswers() == null ||
                        question.getCorrectAnswers().isEmpty())) {
            throw new RuntimeException("MCQ must have at least one correct answer");
        }
    }
}