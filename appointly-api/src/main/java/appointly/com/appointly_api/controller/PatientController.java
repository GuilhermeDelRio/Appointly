package appointly.com.appointly_api.controller;

import appointly.com.appointly_api.controller.common.GenericController;
import appointly.com.appointly_api.dto.patient.GetPatientDTO;
import appointly.com.appointly_api.dto.patient.PatientDTO;
import appointly.com.appointly_api.model.Patient;
import appointly.com.appointly_api.service.PatientService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.UUID;

@RestController
@RequestMapping("/patients")
@RequiredArgsConstructor
public class PatientController implements GenericController {

    private final PatientService patientService;

    @PostMapping
    public ResponseEntity<Object> create(@RequestBody @Valid PatientDTO dto) {
        Patient patient = patientService.createPatient(dto);
        URI location = generateHeaderLocation(patient.getId());
        return ResponseEntity.created(location).build();
    }

    @GetMapping("{id}")
    public ResponseEntity<GetPatientDTO> getById(@PathVariable String id) {
        GetPatientDTO dto = patientService.getPatientById(UUID.fromString(id));
        return ResponseEntity.ok(dto);
    }

    @PutMapping("{id}")
    public ResponseEntity<Object> update(
            @PathVariable("id") String id,
            @RequestBody @Valid PatientDTO dto) {

        UUID idPatient = UUID.fromString(id);
        patientService.updatePatient(idPatient, dto);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Object> delete(@PathVariable String id) {
        UUID idPatient = UUID.fromString(id);
        patientService.deletePatient(idPatient);
        return ResponseEntity.noContent().build();
    }
}
