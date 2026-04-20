package com.examportal.backend.repository;

import com.examportal.backend.entity.Answer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AnswerRepository extends JpaRepository<Answer, Long> {
    List<Answer> findBySubmissionId(Long submissionId);
    List<Answer> findByQuestionId(Long questionId);
}