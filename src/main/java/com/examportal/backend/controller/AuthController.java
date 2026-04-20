package com.examportal.backend.controller;

import com.examportal.backend.dto.AuthResponse;
import com.examportal.backend.dto.LoginRequest;
import com.examportal.backend.entity.User;
import com.examportal.backend.security.JWTUtil;
import com.examportal.backend.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin("*")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private JWTUtil jwtUtil;

    @PostMapping("/register")
    public AuthResponse register(@Valid @RequestBody User user) {
        User savedUser = userService.register(user);
        String token = jwtUtil.generateToken(savedUser.getEmail(), savedUser.getRole());
        return new AuthResponse(token, savedUser.getName(), savedUser.getEmail(), savedUser.getRole());
    }

    @PostMapping("/login")
    public AuthResponse login(@Valid @RequestBody LoginRequest request) {
        User user = userService.login(request.getEmail(), request.getPassword());
        String token = jwtUtil.generateToken(user.getEmail(), user.getRole());
        return new AuthResponse(token, user.getName(), user.getEmail(), user.getRole());
    }

    @GetMapping("/test")
    public String test() {
        return "Protected route working";
    }
}