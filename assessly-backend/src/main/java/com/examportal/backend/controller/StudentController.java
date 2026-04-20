package com.examportal.backend.controller;

import com.examportal.backend.dto.SubmitExamRequest;
import com.examportal.backend.entity.*;
import com.examportal.backend.service.*;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/student")
@CrossOrigin("*")
public class StudentController {

    @Autowired private ExamService examService;
    @Autowired private QuestionService questionService;
    @Autowired private SubmissionService submissionService;

    @GetMapping("/exams")
    public List<Exam> getAllExams() {
        return examService.getAllExams();
    }

    @GetMapping("/exams/{examId}/questions")
    public List<Question> getQuestions(@PathVariable Long examId) {
        return questionService.getQuestionsByExam(examId);
    }

    @PostMapping("/exams/submit")
    public Submission submitExam(@RequestBody SubmitExamRequest request, Authentication auth) {
        return submissionService.submitExam(request, auth.getName());
    }
    @GetMapping("/results")
    public List<Submission> getResults(Authentication auth) {
        return submissionService.getByUser(auth.getName());
    }
}