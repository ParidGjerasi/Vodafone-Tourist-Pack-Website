
package org.example.repository;

import org.example.entity.Packet;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PacketRepository extends JpaRepository<Packet, Long> {
    List<Packet> findByCategoryIgnoreCase(String category);
}
