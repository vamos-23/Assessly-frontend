package com.examportal.backend.controller;

import com.examportal.backend.entity.Question;
import com.examportal.backend.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/questions")
public class QuestionController {

    @Autowired
    private QuestionService questionService;

    @PostMapping("/{examId}")
    public Question addQuestion(@PathVariable Long examId, @RequestBody Question question) {
        return questionService.addQuestion(examId, question);
    }

    @GetMapping("/{examId}")
    public List<Question> getQuestions(@PathVariable Long examId) {
        return questionService.getQuestionsByExam(examId);
    }
}