package appointly.com.appointly_api.controller;

import appointly.com.appointly_api.dto.patient.PatientDTO;
import appointly.com.appointly_api.model.Patient;
import appointly.com.appointly_api.service.PatientService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/patients")
@RequiredArgsConstructor
public class PatientController {

    private final PatientService patientService;

    @PostMapping
    public ResponseEntity<Object> create(@RequestBody @Valid PatientDTO dto) {

        Patient p1 = new Patient();
        p1.setFirstName(dto.firstName());
        p1.setSurname(dto.surname());
        p1.setDateOfBirth(dto.dateOfBirth());
        p1.setPhoneNumber(dto.phoneNumber());
        p1.setEmail(dto.email());
        p1.setSpecialPatient(dto.specialPatient());
        p1.setUnderage(dto.underage());

        System.out.println(p1);

        var patient = patientService.create(p1);
        return ResponseEntity.ok(patient);
    }
}
