package com.examportal.backend.dto;

import jakarta.validation.constraints.*;
import lombok.Data;
import java.util.List;

@Data
public class AnswerRequest {

    @NotNull(message = "Question ID is required")
    private Long questionId;

    @NotNull(message = "Selected options cannot be null")
    @Size(min = 1, message = "At least one option must be selected")
    private List<String> selectedOptions;
}