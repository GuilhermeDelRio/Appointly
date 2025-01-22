package appointly.com.appointly_api.model;

import appointly.com.appointly_api.model.enums.AppointmentStatus;
import jakarta.persistence.*;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "tb_appointment")
@Data
@EntityListeners(AuditingEntityListener.class)
public class Appointment {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "initial_date", nullable = false)
    private LocalDateTime initialDate;

    @Column(name = "final_date", nullable = false)
    private LocalDateTime finalDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "appointment_status", length = 15, nullable = false)
    private AppointmentStatus appointmentStatus;

    @ManyToOne
    @JoinColumn(name = "id_patient")
    private Patient patient;

    @CreatedDate
    @Column(name = "created_date")
    private LocalDateTime createdDate;

    @LastModifiedDate
    @Column(name = "last_modified_date")
    private LocalDateTime lastModifiedDate;
}
