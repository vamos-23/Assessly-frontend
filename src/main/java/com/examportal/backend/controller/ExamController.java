package com.examportal.backend.controller;

import com.examportal.backend.entity.Exam;
import com.examportal.backend.service.ExamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/exams")
public class ExamController {

    @Autowired
    private ExamService examService;

    @PostMapping
    public Exam createExam(@RequestBody Exam exam, Authentication auth) {
        String email = auth.getName();
        return examService.createExam(exam, email);
    }

    @GetMapping
    public List<Exam> getAllExams() {
        return examService.getAllExams();
    }
}