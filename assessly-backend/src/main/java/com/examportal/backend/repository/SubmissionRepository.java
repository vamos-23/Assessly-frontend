package com.examportal.backend.repository;

import com.examportal.backend.entity.Submission;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SubmissionRepository extends JpaRepository<Submission, Long> {
    List<Submission> findByExamId(Long examId);
    List<Submission> findByUserEmail(String email);
}