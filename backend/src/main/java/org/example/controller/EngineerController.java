package org.example.controller;

import org.example.entity.Engineer;
import org.example.repository.EngineerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000") // Important for React!
public class EngineerController {

    @Autowired
    private EngineerRepository engineerRepository;

    @GetMapping("/engineers")
    public List<Engineer> getAllEngineers() {
        return engineerRepository.findAll();

    }
}