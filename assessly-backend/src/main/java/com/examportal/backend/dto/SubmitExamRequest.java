package com.examportal.backend.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import lombok.Data;
import java.util.List;

@Data
public class SubmitExamRequest {

    @NotNull(message = "Exam ID is required")
    private Long examId;

    @NotNull(message = "Answers cannot be null")
    @Size(min = 1, message = "At least one answer is required")
    private List<@Valid AnswerRequest> answers;
}