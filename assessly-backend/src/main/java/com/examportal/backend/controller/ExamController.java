package com.examportal.backend.controller;

import com.examportal.backend.entity.Exam;
import com.examportal.backend.service.ExamService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/exams")
@CrossOrigin("*")
public class ExamController {

    @Autowired
    private ExamService examService;

    @PostMapping
    public Exam createExam(@Valid @RequestBody Exam exam, Authentication auth) {
        return examService.createExam(exam, auth.getName());
    }

    @GetMapping
    public List<Exam> getAllExams() {
        return examService.getAllExams();
    }

    @DeleteMapping("/{id}")
    public String deleteExam(@PathVariable Long id) {
        examService.deleteExam(id);
        return "Exam deleted";
    }
}