package com.examportal.backend.controller;

import com.examportal.backend.repository.ExamRepository;
import com.examportal.backend.repository.QuestionRepository;
import com.examportal.backend.repository.SubmissionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/admin/dashboard")
@CrossOrigin("*")
public class AdminDashboardController {

    @Autowired
    private ExamRepository examRepository;

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private SubmissionRepository submissionRepository;

    @GetMapping("/stats")
    public Map<String, Object> getStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalExams", examRepository.count());
        stats.put("totalQuestions", questionRepository.count());
        stats.put("totalSubmissions", submissionRepository.count());
        return stats;
    }
}