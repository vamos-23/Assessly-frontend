package com.examportal.backend.service;

import com.examportal.backend.entity.Exam;
import com.examportal.backend.repository.ExamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExamService {

    @Autowired
    private ExamRepository examRepository;

    public Exam createExam(Exam exam, String adminEmail) {
        exam.setCreatedBy(adminEmail);
        return examRepository.save(exam);
    }
    public List<Exam> getAllExams() {
        return examRepository.findAll();
    }
}