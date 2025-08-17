package org.example.service;

import org.example.dto.ActivationRequestDto;
import org.example.dto.ActivationResponseDto;
import org.example.entity.Activation;
import org.example.entity.Packet;
import org.example.repository.ActivationRepository;
import org.example.repository.PacketRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.regex.Pattern;

@Service
public class ActivationService {
    private final PacketRepository packetRepo;
    private final ActivationRepository activationRepo;

    // simple validators to mirror your frontend checks
    private static final Pattern EMAIL_RX = Pattern.compile("^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$");
    private static final Pattern AL_PHONE_RX = Pattern.compile("^\\+35569\\d{7}$");

    public ActivationService(PacketRepository packetRepo, ActivationRepository activationRepo) {
        this.packetRepo = packetRepo;
        this.activationRepo = activationRepo;
    }

    @Transactional
    public ActivationResponseDto activate(ActivationRequestDto req) {
        // 1) find the packet
        Packet packet = packetRepo.findById(req.packetId()).orElseThrow();

        // 2) validate customer info (kept simple, matching your UI)
        if (req.customerInfo() == null) throw new IllegalArgumentException("Customer info required");
        String name = req.customerInfo().name();
        String surname = req.customerInfo().surname();
        String email = req.customerInfo().email();
        String phone = req.customerInfo().phone();

        if (name == null || name.isBlank()) throw new IllegalArgumentException("Name required");
        if (surname == null || surname.isBlank()) throw new IllegalArgumentException("Surname required");
        if (email == null || !EMAIL_RX.matcher(email).matches()) throw new IllegalArgumentException("Invalid email");
        if (phone == null || !AL_PHONE_RX.matcher(phone).matches()) throw new IllegalArgumentException("Invalid phone format (+35569xxxxxxx)");

        // 3) if TV packet, ensure only one TV packet stays active
        String cat = packet.getCategory();
        if (cat != null && "TV".equalsIgnoreCase(cat)) {
            // USE the repo method that exists: findByCategoryIgnoreCase
            List<Packet> tvPackets = packetRepo.findByCategoryIgnoreCase("TV");
            for (Packet p : tvPackets) {
                if (!p.getId().equals(packet.getId()) && Boolean.TRUE.equals(p.getIsActive())) {
                    p.setIsActive(false);
                    packetRepo.save(p);
                }
            }
        }

        // 4) create the activation row
        Activation a = new Activation();
        a.setPacket(packet);
        a.setName(name.trim());
        a.setSurname(surname.trim());
        a.setEmail(email.trim());
        a.setPhone(phone.trim());
        a.setStatus("CREATED");
        a = activationRepo.save(a);

        // 5) mark the packet active
        packet.setIsActive(true);
        packetRepo.save(packet);

        // 6) return response
        return new ActivationResponseDto(a.getId(), a.getStatus(), "OK");
    }
}
