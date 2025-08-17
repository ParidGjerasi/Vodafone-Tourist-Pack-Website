package org.example.controller;

import org.example.dto.PacketDto;
import org.example.service.PacketService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/packets")
public class PacketController {

    private final PacketService service;

    public PacketController(PacketService service) {
        this.service = service;
    }

    // ====== EXISTING ======

    @GetMapping
    public List<PacketDto> getAll() {
        return service.findAllDtos();
    }

    @PostMapping
    public PacketDto create(@RequestBody PacketDto dto) {
        return service.create(dto);
    }

    // Accept BOTH POST and PUT on the same path to toggle
    @RequestMapping(value = "/{id}/activate", method = { RequestMethod.POST, RequestMethod.PUT })
    public PacketDto toggleActivation(@PathVariable Long id) {
        return service.toggleActivation(id);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

    // ====== ADDED: TV-only endpoints ======

    /** List only TV packets */
    @GetMapping("/tv")
    public List<PacketDto> getTvPackets() {
        return service.findTvDtos();
    }

    /** Create a TV packet (category forced to "TV") */
    @PostMapping("/tv")
    public PacketDto createTvPacket(@RequestBody PacketDto dto) {
        return service.createTv(dto);
    }
}
