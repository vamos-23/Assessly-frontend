package com.examportal.backend.controller;

import com.examportal.backend.entity.Submission;
import com.examportal.backend.service.SubmissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/submissions")
@CrossOrigin("*")
public class AdminSubmissionController {

    @Autowired
    private SubmissionService submissionService;

    @GetMapping
    public List<Submission> getAll() {
        return submissionService.getAllSubmissions();
    }

    @GetMapping("/{examId}")
    public List<Submission> getByExam(@PathVariable Long examId) {
        return submissionService.getSubmissionsByExam(examId);
    }
}