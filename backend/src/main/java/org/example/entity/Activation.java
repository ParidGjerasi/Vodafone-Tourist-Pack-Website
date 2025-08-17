package org.example.entity;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "activations")
public class Activation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Which packet was activated
    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "packet_id")
    private Packet packet;

    // Customer info captured from your modal
    private String name;
    private String surname;
    private String email;
    private String phone;

    private String status;      // e.g., CREATED
    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = Instant.now();
        if (this.status == null) this.status = "CREATED";
    }

    // Getters/setters
    public Long getId() { return id; }
    public Packet getPacket() { return packet; }
    public void setPacket(Packet packet) { this.packet = packet; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getSurname() { return surname; }
    public void setSurname(String surname) { this.surname = surname; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
}
