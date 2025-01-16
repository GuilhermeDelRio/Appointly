package appointly.com.appointly_api.controller;

import appointly.com.appointly_api.controller.common.GenericController;
import appointly.com.appointly_api.controller.mappers.PatientMapper;
import appointly.com.appointly_api.dto.patient.PatientDTO;
import appointly.com.appointly_api.dto.patient.GetPatientDTO;
import appointly.com.appointly_api.model.Patient;
import appointly.com.appointly_api.service.PatientService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/patients")
@RequiredArgsConstructor
public class PatientController implements GenericController {

    private final PatientService patientService;
    private final PatientMapper mapper;


    @PostMapping
    public ResponseEntity<Object> create(@RequestBody @Valid PatientDTO dto) {
        Patient patient = mapper.toEntity(dto);
        patientService.create(patient);
        URI location = generateHeaderLocation(patient.getId());

        return ResponseEntity.created(location).build();
    }

    @GetMapping("{id}")
    public ResponseEntity<GetPatientDTO> getById(@PathVariable String id) {
        return patientService
                .getById(UUID.fromString(id))
                .map(pat -> {
                    GetPatientDTO dto = mapper.toDTO(pat);
                    return ResponseEntity.ok(dto);
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("{id}")
    public ResponseEntity<Object> update(
            @PathVariable("id") String id,
            @RequestBody @Valid PatientDTO dto) {

        UUID idPatient = UUID.fromString(id);
        Optional<Patient> patient = patientService.getById(idPatient);

        if (patient.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Patient patientToUpdate = patient.get();

        patientToUpdate.setFirstName(dto.firstName());
        patientToUpdate.setSurname(dto.surname());
        patientToUpdate.setDateOfBirth(dto.dateOfBirth());
        patientToUpdate.setPhoneNumber(dto.phoneNumber());
        patientToUpdate.setEmail(dto.email());
        patientToUpdate.setSpecialPatient(dto.specialPatient());
        patientToUpdate.setUnderage(dto.underage());
        patientToUpdate.setResponsibleName(dto.responsibleName());
        patientToUpdate.setResponsibleEmail(dto.responsibleEmail());
        patientToUpdate.setRelationshipDegree(dto.relationshipDegree());

        patientService.update(patientToUpdate);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Object> delete(@PathVariable String id) {
        UUID idPatient = UUID.fromString(id);
        Optional<Patient> patient = patientService.getById(idPatient);

        if (patient.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        patientService.delete(idPatient);
        return ResponseEntity.noContent().build();

    }
}
