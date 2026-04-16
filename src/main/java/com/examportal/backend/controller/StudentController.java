package com.examportal.backend.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/student")
public class StudentController {

    @GetMapping("/test")
    public String test() {
        return "Student access granted";
    }
}