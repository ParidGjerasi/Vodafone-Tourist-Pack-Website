package org.example.service;

import org.example.dto.PacketDto;
import org.example.entity.Packet;
import org.example.repository.PacketRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PacketService {
    private final PacketRepository repo;

    public PacketService(PacketRepository repo) {
        this.repo = repo;
    }

    // ====== EXISTING ======
    public List<PacketDto> findAllDtos() {
        return repo.findAll().stream().map(this::toDto).toList();
    }

    public PacketDto toggleActivation(Long id) {
        Packet p = repo.findById(id).orElseThrow();
        Boolean current = p.getIsActive() != null ? p.getIsActive() : Boolean.FALSE;
        p.setIsActive(!current);
        p = repo.save(p);
        return toDto(p);
    }

    public PacketDto create(PacketDto dto) {
        Packet p = new Packet(
                dto.name(),
                dto.price(),
                dto.currency(),
                dto.durationDays(),
                dto.dataAmount(),
                dto.minutes(),
                dto.sms(),
                dto.description(),
                dto.category()
        );
        p.setIsActive(dto.isActive() != null ? dto.isActive() : Boolean.FALSE);
        p = repo.save(p);
        return toDto(p);
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }

    private PacketDto toDto(Packet p) {
        return new PacketDto(
                p.getId(),
                p.getName(),
                p.getPrice(),
                p.getCurrency(),
                p.getDurationDays(),
                p.getDataAmount(),
                p.getMinutes(),
                p.getSms(),
                p.getIsActive(),
                p.getDescription(),
                p.getCategory()
        );
    }

    // ====== ADDED: TV-only helpers ======

    /** List packets for a specific category as DTOs */
    public List<PacketDto> findByCategoryDtos(String category) {
        return repo.findByCategoryIgnoreCase(category)
                .stream()
                .map(this::toDto)
                .toList();
    }

    /** Convenience: list TV packets only */
    public List<PacketDto> findTvDtos() {
        return findByCategoryDtos("TV");
    }

    /** Create a TV packet (category is forced to "TV" so it never mixes with others) */
    public PacketDto createTv(PacketDto dto) {
        Packet p = new Packet(
                dto.name(),
                dto.price(),
                dto.currency(),
                dto.durationDays(),
                dto.dataAmount(),
                dto.minutes(),
                dto.sms(),
                dto.description(),
                "TV" // force TV category
        );
        p.setIsActive(dto.isActive() != null ? dto.isActive() : Boolean.FALSE);
        p = repo.save(p);
        return toDto(p);
    }
}
