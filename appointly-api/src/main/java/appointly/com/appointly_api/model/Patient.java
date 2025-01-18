package appointly.com.appointly_api.model;

import appointly.com.appointly_api.model.enums.RelationshipDegree;
import jakarta.persistence.*;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "tb_patient")
@Data
@EntityListeners(AuditingEntityListener.class)
public class Patient {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "first_name", length = 25, nullable = false)
    private String firstName;

    @Column(name = "surname", length = 50, nullable = false)
    private String surname;

    @Column(name = "date_of_birth", nullable = false)
    private LocalDate dateOfBirth;

    @Column(name = "phone_number", length = 25, nullable = false)
    private String phoneNumber;

    @Column(name = "email", length = 50, nullable = false)
    private String email;

    @Column(name = "special_patient", nullable = false)
    private boolean specialPatient;

    @Column(name = "underage")
    private boolean underage;

    @Column(name = "responsible_name", length = 25)
    private String responsibleName;

    @Column(name = "responsible_email", length = 50)
    private String responsibleEmail;

    @Column(name = "responsible_phone_number", length = 25)
    private String responsiblePhoneNumber;

    @Enumerated(EnumType.STRING)
    @Column(name = "relationship_degree", length = 30)
    private RelationshipDegree relationshipDegree;

    // AUDITY
//    @Column(name = "id_user", length = 100)
//    private String idUser;

    @CreatedDate
    @Column(name = "created_date")
    private LocalDateTime createdDate;

    @LastModifiedDate
    @Column(name = "last_modified_date")
    private LocalDateTime lastModifiedDate;
}
