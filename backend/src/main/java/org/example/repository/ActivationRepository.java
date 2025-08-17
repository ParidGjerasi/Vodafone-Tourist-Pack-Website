package org.example.repository;

import org.example.entity.Activation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ActivationRepository extends JpaRepository<Activation, Long> {}
