package org.example.dto;

public record PacketDto(
        Long id,
        String name,
        Double price,
        String currency,
        Integer durationDays,
        String dataAmount,
        String minutes,
        String sms,
        Boolean isActive,
        String description,
        String category
) {}
