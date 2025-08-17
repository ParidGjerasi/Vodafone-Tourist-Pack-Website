package org.example.controller;

import org.example.dto.ActivationRequestDto;
import org.example.dto.ActivationResponseDto;
import org.example.service.ActivationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/activations")
public class ActivationController {
    private final ActivationService service;

    public ActivationController(ActivationService service) {
        this.service = service;
    }

    @PostMapping
    public ActivationResponseDto create(@RequestBody ActivationRequestDto req) {
        // keep your original behavior
        return service.activate(req);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Map<String, String>> badRequest(IllegalArgumentException ex) {
        return ResponseEntity.badRequest().body(Map.of("message", ex.getMessage()));
    }
}
