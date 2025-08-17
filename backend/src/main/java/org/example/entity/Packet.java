package org.example.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "internet_package")
public class Packet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private Double price;

    @Column(name = "currency")
    private String currency;

    @Column(name = "duration_days")
    private Integer durationDays;

    @Column(name = "data_amount")
    private String dataAmount;

    // DB columns are "minutes" and "sms" (snake_case not required here)
    private String minutes;
    private String sms;

    @Column(name = "is_active")
    private Boolean isActive;

    private String description;
    private String category;

    // --- Constructors ---

    public Packet() {
    }

    public Packet(
            String name,
            Double price,
            String currency,
            Integer durationDays,
            String dataAmount,
            String minutes,
            String sms,
            String description,
            String category
    ) {
        this.name = name;
        this.price = price;
        this.currency = currency;
        this.durationDays = durationDays;
        this.dataAmount = dataAmount;
        this.minutes = minutes;
        this.sms = sms;
        this.isActive = false; // default
        this.description = description;
        this.category = category;
    }

    // --- Getters & Setters ---

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public Integer getDurationDays() {
        return durationDays;
    }

    public void setDurationDays(Integer durationDays) {
        this.durationDays = durationDays;
    }

    public String getDataAmount() {
        return dataAmount;
    }

    public void setDataAmount(String dataAmount) {
        this.dataAmount = dataAmount;
    }

    public String getMinutes() {
        return minutes;
    }

    public void setMinutes(String minutes) {
        this.minutes = minutes;
    }

    public String getSms() {
        return sms;
    }

    public void setSms(String sms) {
        this.sms = sms;
    }

    // Getter name kept as getIsActive() so JSON is "isActive" (matches your frontend)
    public Boolean getIsActive() {
        return isActive;
    }

    public void setIsActive(Boolean active) {
        isActive = active;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    // --- Optional: toString (handy for logs) ---
    @Override
    public String toString() {
        return "Packet{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", price=" + price +
                ", currency='" + currency + '\'' +
                ", durationDays=" + durationDays +
                ", dataAmount='" + dataAmount + '\'' +
                ", minutes='" + minutes + '\'' +
                ", sms='" + sms + '\'' +
                ", isActive=" + isActive +
                ", description='" + description + '\'' +
                ", category='" + category + '\'' +
                '}';
    }
}
