package org.example.repository;

import org.example.entity.SoftwareEngineer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SoftwareEngineerRepository extends JpaRepository <SoftwareEngineer, Integer> {
}
